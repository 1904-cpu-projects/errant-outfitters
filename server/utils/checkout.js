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

  // const stripeCart = cart.map(item => ({
  //   name: item.product.name,
  //   amount: item.product.cost || 99999,
  //   currency: 'usd',
  //   quantity: item.quantity,
  // }));
  // const stripeSession = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: stripeCart,
  //   success_url: 'https://errant-outfitters-cpu.herokuapp.com/#/',
  //   cancel_url: 'https://errant-outfitters-cpu.herokuapp.com/#/myCart',
  // });
  // checkoutId = stripeSession.id;
  // return checkoutId;
}

module.exports = { checkoutStripe, checkoutId };
