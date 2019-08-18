const router = require('express').Router();
const { Review } = require('../db/index.js');

//All reviews
router.get('/', async (req, res, next) => {
  try {
    res.send(await Review.findAll());
  } catch (err) {
    next(err);
  }
});

//Single review
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Review.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

//All reviews for a product
router.get('/:productId', async (req, res, next) => {
  try {
    const productReviews = Review.findAll({
      where: {
        productId: req.params.productId,
      },
    });
    res.send(productReviews);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create({
      ...req.body,
    });
    res.status(201).send(newReview);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const article = await Review.findOne({
      where: {
        id: req.params.id,
      },
    });
    await article.update({ ...req.body });
    res.status(201).send(article);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send('Review removed');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
