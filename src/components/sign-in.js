import React from 'react'
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints'
import DisplayFields from 'react-form-with-constraints/lib/DisplayFields'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js'
import {
  Button,
  Container,
  Input,
  Text
} from 'rebass'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true,
      email: '',
      message: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  handleEmailChange (event: React.ChangeEvent<HTMLInputElement>) {
    const form = FormWithConstraints
    this.setState({ email: event.target.value })
    this.form.validateFields(event.currentTarget)
    this.setState({ disabled: !this.form.isValid()})
  }

  handlePasswordChange (event: React.ChangeEvent<HTMLInputElement>) {
    const form = FormWithConstraints
    this.setState({ password: event.target.value})
    this.form.validateFields(event.currentTarget)
    this.setState({ disabled: !this.form.isValid()})
  }

  signIn (email, password) {

    const userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_APP_CLIENT_ID
    })
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    })
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSucess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password
    try {
      await this.signIn(email, password)
      this.props.userHasAuthenticated(true)
    } catch (e) {
      alert(e)
    }
  }

  render () {
    return (
      <Container>
        <FormWithConstraints
          ref={(formWithConstraints: any) => this.form = formWithConstraints}
          noValidate
        >
          <Text
            p={2}
            children={'sign up: '}
          />
          <Input
            p={2}
            pl={3}
            my={2}
            mr={3}
            bg='white'
            placeholder='your favourite email'
            type='email'
            name='email'
            autoFocus
            required
            className='required email'
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <Input
            p={2}
            pl={3}
            my={2}
            mr={3}
            bg='white'
            placeholder='your password'
            type='password'
            name='password'
            pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$
  '
            autoFocus
            required
            className='required password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <Button
            mb={1}
            fontSize={1}
            children='SIGN IN'
            onClick={this.handleSubmit}
            disabled={this.state.disabled}
          />
          <FieldFeedbacks for='email'>
            <FieldFeedback when='typeMismatch'>
              <Text
                p={2}
                color='red.5'
                children='Invalid email address.'
              />
            </FieldFeedback>
          </FieldFeedbacks>
          <Text
            p={2}
            children={this.state.message}
          />
        </FormWithConstraints>
      </Container>
    )
  }
}
export default SignIn
