const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const passport = require('passport');
const User = require('./db/models/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('morgan')('tiny'));

app.use('/', express.static(path.join(__dirname, '../public')));

require('dotenv').config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    name: 'SID',
  }),
);

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use('/auth', require('./auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/login', require('./routes/login'));
app.use('/api/users', require('./routes/users'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/transactions', require('./routes/transactions'));

module.exports = app;
