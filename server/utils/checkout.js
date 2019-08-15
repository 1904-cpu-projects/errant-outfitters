const stripe = require('stripe')('sk_test_VFD2hiPa4YhyInOUapuwWQYu00EJFUD9Ql');

let checkoutId;

async function checkoutStripe(cart) {
  const stripeCart = cart.map(item => ({
    name: item.product.name,
    amount: 100 || item.product.cost,
    currency: 'usd',
    quantity: item.quantity,
  }));
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCart,
    success_url: 'https://errant-outfitters-cpu.herokuapp.com/#/',
    cancel_url: 'https://errant-outfitters-cpu.herokuapp.com/#/myCart',
  });
  checkoutId = stripeSession.id;
  return checkoutId;
}

module.exports = { checkoutStripe, checkoutId };
