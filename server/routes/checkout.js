const router = require('express').Router();

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// (async () => {
//   const stripeSession = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       name: 'T-shirt',
//       description: 'Comfortable cotton t-shirt',
//       images: ['https://example.com/t-shirt.png'],
//       amount: 500,
//       currency: 'usd',
//       quantity: 1,
//     }],
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//   });
// })();
