const router = require('express').Router();
const { User } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(singleUser);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newItem = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      class: req.body.class,
      password: req.body.password,
    });
    req.session.userId = newItem.id; // eslint-disable-line require-atomic-updates
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id);
    updateUser.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      class: req.body.class,
    });
    res.status(200).send(updateUser);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(404).send('user removed');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
