const router = require('express').Router();

const { hashPassword } = require('../utils/commonUtils');
const { User } = require('../db/index.js');

// This route will setup the user as logged in by sending the userId to the client
// It will also send the admin flag if the user is an admin, normally set null
// This will also set req.session.userId which would qualify as the user is logged in
// on a client browser inital load of the landing page.
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && User.verifyPassword(user, req.body.password)) {
      req.session.userId = user.id;
      res.status(202).send({
        isAdmin: user.isAdmin,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      // User password bad
      // We should probably have a number of login attempts set on req.session
      // so that a suspected brute force hacker can not keep spamming login request
      // Maybe set time limit to retry to like 3 min or so?
      res.status(404).send();
    }
  } catch (e) {
    // User not found by email
    // I'm not sure if we should qualify this as a login attempt, but nothing
    // should be set for now.
    console.log(e);
    res.status(404).send();
  }
});

// This just flat out destroys the user session. All server information is lost at
// this point. For now I am assuming that the user is actually logged in, and that
// the only means by which this route can be accessed is through the "logout" button
// Though this is not true. So maybe more qualification needs to be checked, but for
// now I think this suffices
router.get('/logout', (req, res, next) => {
  try {
    req.session.destroy();
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// This is for initial load of page in the brower by a client. If req.session.userId
// exists, we just assume the user is qualified as logged in and send the relevant
// information.
router.get('/checkLoggedIn', async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      res.status(202).send({
        isAdmin: user.isAdmin,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (e) {
      res.status(404).send();
    }
  } else res.send();
});

module.exports = router;
