const router = require('express').Router();
const { Product } = require('../db/index.js');

router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id);
    res.status(200).send(p);
  } catch (e) {
    res.status(404).send('Product missing for some damn reason.');
  }
});

router.get('/', async (req, res, next) => {
  try {
    res.status(200).send(await Product.findAll());
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newItem = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      stock: req.body.stock,
      cost: req.body.cost,
    });
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateProduct = await Product.findByPk(req.params.id);
    updateProduct.update({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      stock: req.body.stock,
      cost: req.body.cost,
    });
    res.send(updateProduct);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
