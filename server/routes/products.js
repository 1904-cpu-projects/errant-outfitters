const router = require("express").Router();
const { model } = require("../db/models");
const Product = model.Product;

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send(await Product.findAll());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newItem = await Product.create({ ...req.body });
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updateProduct = await Product.findByPk(req.params.id);
    updateProduct.update({ ...req.body });
    res.send(updateProduct);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
