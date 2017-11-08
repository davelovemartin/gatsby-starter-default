const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  // Product information
  const id = requestBody.id

  // Create order
  return stripe.skus.del({
    id
  })
  .then(() => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Sku deleted succesfully!`
      })
    }
    callback(null, response)
  })
  .catch((err) => {
    console.log(err)
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: err.message
      })
    }
    callback(null, response)
  })
}
