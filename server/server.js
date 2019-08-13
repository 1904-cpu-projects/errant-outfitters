const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

//Main route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('morgan')('tiny'));

app.use('/', express.static(path.join(__dirname, '../public')));

// Leaving the sequelizeStore out of the mix for now
// I think in production we will want to have this actuall
// active though. There is a lot of thought that goes into
// that little peice of code though
// Additionally we may want to investigate saveUninitialized a bit more

app.use(
  session({
    secret: process.env.SESSION_SECRET || "We're going on a bear hunt",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    name: 'SID',
    // store: new SequelizeStore({
    //   db,
    //   table: "session",
    //   extendDefaultFields: (defaults, session) => ({
    //     data: defaults.data,
    //     expires: defaults.expires,
    //     userId: session.userId
    //   })
    // })
  }),
);

// Setting up sessions routes
// I don't think we need sessions any longer due to my (Nick's)
// misunderstanding of what sessions was for. So ./routes/login.js
// is basically this
app.use('/api/sessions', require('./routes/sessions'));

//Main routes
// Nick: I've ordered these in most used to least used
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/login', require('./routes/login'));
app.use('/api/users', require('./routes/users'));

//WORKSHOP- STRIPE//

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

let checkoutId

(async () => {
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'https://example.com/success',
    cancel_url: 'http://localhost:3000/#/myCart',
  });
})()

app.post('/api/checkout', (req,res,next) => {
  stripe.redirectToCheckout({
    sessionId: checkoutId
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  });
})


//WORKSHOP//

module.exports = app, checkoutId;
