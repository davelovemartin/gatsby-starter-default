const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  // Product information
  const style = requestBody.style
  const size = requestBody.size
  const id = requestBody.id
  const colour = requestBody.colour
  const artist = requestBody.artist

  // Create order
  return stripe.skus.create({
    currency: 'gbp',
    inventory: {type: 'infinite'},
    price: '2999',
    product: id,
    active: true,
    attributes: {'style': style, 'size': size, 'colour': colour, 'artist': artist}
  })
  .then(() => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Sku created succesfully!`
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
