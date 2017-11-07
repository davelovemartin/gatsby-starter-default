const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  // Product information
  const name = requestBody.name
  const url = requestBody.url
  const id = requestBody.id
  const description = requestBody.description

  // Create order
  return stripe.products.create({
    id: id,
    name: name,
    active: true,
    attributes: ['artist', 'colour', 'size', 'style'],
    description: description,
    images: [url]
  })
  .then(() => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Product created succesfully!`
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
