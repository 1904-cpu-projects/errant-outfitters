const router = require('express').Router();

const { User } = require('../db/index.js');

router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user && User.verifyPassword(user, req.body.password)) {
      // eslint-disable-next-line require-atomic-updates
      req.session.userId = user.id;
      res.status(202).send({
        isAdmin: user.isAdmin,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        class: user.class,
        email: user.email,
      });
    } else {
      res.status(404).send();
    }
  } catch (e) {
    res.status(404).send();
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/checkLoggedIn', async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      res.status(202).send({
        isAdmin: user.isAdmin,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        class: user.class,
        email: user.email,
      });
    } catch (e) {
      res.status(404).send(e);
    }
  } else res.send();
});

module.exports = router;
