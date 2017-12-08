import React from 'react'
import CustomHelmet from '../components/helmet'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import SignUpPrompt from '../components/sign-up-prompt'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints'
import DisplayFields from 'react-form-with-constraints/lib/DisplayFields'

import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea
} from 'rebass'

var _ = require('lodash')

class Thankyou extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      disabled: true,
      message: '',
      userMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    let form = FormWithConstraints
    this.setState({ email: e.target.value })
    this.form.validateFields(e.currentTarget)
    this.setState({ disabled: !this.form.isValid()})
  }

  handleMessageChange (e: React.ChangeEvent<HTMLInputElement>) {
    let form = FormWithConstraints
    this.setState({ userMessage: e.target.value })
  }

  async sendMessage (email, userMessage) {
    // Backend API url
    const res = await fetch(process.env.SEND_MESSAGE, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        userMessage: userMessage
      })
    })
    const data = await res.json()
    console.log(data)
    this.setState({
      email: '',
      disabled: true,
      message: data.message,
      userMessage: ''
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const email = this.state.email
    const userMessage = this.state.userMessage
    this.sendMessage(email, userMessage)
  }

  render () {
    return (
      <div>
        <CustomHelmet
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
          googleSiteVerification={this.props.data.site.siteMetadata.googleSiteVerification}
          fbAppId={this.props.data.site.siteMetadata.fbAppId}
          url={this.props.data.site.siteMetadata.url}
          facebookImage={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/facebook-image.jpg'}
          twitter={this.props.data.site.siteMetadata.twitter}
          preview={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/preview.jpg'}
          location={this.props.location.pathname}
        />
        <Navbar navigation={this.props.data.allContentfulNavigation.edges} />
        {_.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'c3vQz6oymeQ6E6SQoeuyiks']).map(({node}) => (
          <Header
            key={node.id}
            title='Contact us'
            subtitle='any problems - just give us a shout'
            image={node.sizes}
          />
        )).value()}
        <About
          children={`Send us a message and we'll reply via email`}
        />
        <Container>
          <Box
            mb={5}
            px={5}
            width={'100%'}
          >
            <FormWithConstraints
              ref={(formWithConstraints: any) => this.form = formWithConstraints}
              noValidate
            >
              <label htmlFor="email">Email:</label>
              <Input
                p={2}
                my={2}
                bg='white'
                placeholder='Your favourite email'
                id='email'
                type='email'
                name='email'
                aria-required
                required
                className='required email'
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="text">Your message:</label>
              <Textarea
                p={2}
                my={2}
                bg='white'
                rows={8}
                placeholder='Your message'
                id='text'
                type='text'
                name='text'
                aria-required
                required
                className='required text'
                value={this.state.userMessage}
                onChange={this.handleMessageChange}
              />
              <Button
                mb={1}
                fontSize={1}
                bg={'base'}
                children='SEND YOUR MESSAGE'
                onClick={this.handleSubmit}
                disabled={this.state.disabled}
              />
              <FieldFeedbacks for='email'>
                <FieldFeedback when='typeMismatch'>
                  <Text
                    p={2}
                    color='red5'
                    children='Invalid email address.'
                  />
                </FieldFeedback>
              </FieldFeedbacks>
              <Text
                p={2}
                children={this.state.message}
              />
            </FormWithConstraints>
          </Box>
        </Container>
        <SignUpPrompt />
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Thankyou

export const contactQuery = graphql`
query ContactQuery {
  site {
    siteMetadata {
      title
    }
  }
  allContentfulAsset {
    edges {
      node {
        id
        title
        sizes(maxHeight: 600) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
  allContentfulNavigation {
    edges {
      node {
        order
        href
        position
        text
      }
    }
  }
}
`
