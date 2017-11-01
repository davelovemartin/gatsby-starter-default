import React from 'react'
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints'
import DisplayFields from 'react-form-with-constraints/lib/DisplayFields'
import {
  Button,
  Input,
  Text
} from 'rebass'

class MailingListSignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      disabled: true,
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addMailSubscriber = this.addMailSubscriber.bind(this)
  }

  handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const form = FormWithConstraints
    this.setState({ email: e.target.value })
    this.form.validateFields(e.currentTarget)
    this.setState({ disabled: !this.form.isValid()})
  }

  async addMailSubscriber (email) {
    // Backend API url
    const res = await fetch(process.env.MAILCHIMP_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    })
    const data = await res.json()
    this.setState({
      email: '',
      disabled: true,
      message: data.message
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const email = this.state.email
    this.addMailSubscriber(email)
  }

  render () {
    return (
      <FormWithConstraints
        ref={(formWithConstraints: any) => this.form = formWithConstraints}
        noValidate
      >
        <Text
          p={2}
          children='sign up for our newsletter:'
          color='white'
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
          required
          className='required email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Button
          mb={1}
          fontSize={1}
          children='JOIN OUR MAILING LIST'
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
          color='white'
        />
      </FormWithConstraints>
    )
  }
}
export default MailingListSignUp
