const stripe = require('stripe')('sk_test_VFD2hiPa4YhyInOUapuwWQYu00EJFUD9Ql');

let checkoutId;

async function checkoutStripe(token, cart) {
  let amount = cart.reduce((acc, item) => {
    return (acc += item.product.cost * item.quantity);
  }, 0);
  amount *= 100;
  try {
    const status = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
    });
    return status;
  } catch (e) {
    return e;
  }
}

module.exports = { checkoutStripe, checkoutId };
