const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
const md5 = require('js-md5')
const listId = process.env.MAILCHIMP_LIST_ID

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const email = requestBody.email
  const hashedEmail = md5(email)

  return mailchimp.post('lists/' + listId + '/members/', {
    email_address: email,
    status: 'pending'
  })
  .then(function (results) {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Please check your inbox to confirm`
      })
    }
    callback(null, response)
  })
  .catch(function (err) {
    return mailchimp.get('lists/' + listId + '/members/' + hashedEmail).then(function (results) {
      if (results.status === 'subscribed') {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            message: `You are already subscribed`
          })
        }
        callback(null, response)
      } else if (results.status === 'pending') {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            message: `You have already subscribed - please check your inbox to confirm`
          })
        }
        callback(null, response)
      } else if (results.status === 'cleaned') {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            message: `Emails to the address have been bouncing (returned undelivered) so we are unable to subscribe you`
          })
        }
        callback(null, response)
      } else if (results.status === 'unsubscribed') {
        return mailchimp.patch('lists/' + listId + '/members/' + hashedEmail, {
          status: 'subscribed'
        }).then(function (results) {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              message: `Thanks for subscribing`
            })
          }
          callback(null, response)
        })
        .catch(function (err) {
          console.log(err)
          const response = {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              message: err.message
            })
          }
          callback(null, response)
        })
      } else {
        console.log(err)
        const response = {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            message: err.message
          })
        }
        callback(null, response)
      }
    })
  })
}
