const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const passport = require('passport');
const User = require('./db/models/User');

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

////oauth
// consumes 'req.session' so that passport can know what's on the session
app.use(passport.initialize());

// this will invoke our registered 'deserializeUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session());

// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// If we've serialized the user on our session with an id, we look it up here
// and attach it as 'req.user'.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// authentication router
app.use('/auth', require('./auth'));

////oauth

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
app.use('/api/checkout', require('./routes/checkout'));

module.exports = app;
