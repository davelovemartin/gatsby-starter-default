const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const code = requestBody.code
  return stripe.coupons.retrieve(
    code
  ).then((coupon) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Discount unlocked`,
        verified: true,
        coupon
      })
    }
    callback(null, response)
  }).catch((err) => { // Error response
    console.log(err)
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: `Code not recognised`,
        verified: false
      })
    }
    callback(null, response)
  })
}
