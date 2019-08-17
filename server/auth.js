const router = require('express').Router();
const User = require('./db/models/User.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = router;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        '836317429935-avbgq12e0kegafhjjfabf65j9g5n04jg.apps.googleusercontent.com',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || 'XmZB0o7LxU5kic_AnJgNRRWy',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async function(accessToken, refreshToken, profile, done) {
      const info = {
        firstName: profile.emails[0].value,
        lastName: '',
        class: 'mage',
        email: profile.emails[0].value,
        password: '123',
      };
      try {
        const [user] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: info,
        });
        done(null, user);
      } catch (error) {
        console.log(error);
      }
    },
  ),
);

router.get('/google', passport.authenticate('google', { scope: 'email' }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.userId = req.user.id;
    res.redirect('/');
  },
);
