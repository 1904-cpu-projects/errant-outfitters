const router = require('express').Router();
const { checkoutStripe } = require('../utils/checkout');
const { Cart, Product, Transaction } = require('../db/index');

router.post('/', async (req, res, next) => {
  let cart;
  try {
    if (req.session.userId)
      cart = await Cart.findAll({
        where: { memberId: req.session.userId },
        include: [{ model: Product }],
      });
    else
      cart = await Cart.findAll({
        where: { memberId: req.sessionID },
        include: [{ model: Product }],
      });
    await checkoutStripe(req.body, cart);
    const timeStamp = Date.now();
    const transactions = cart.map(item => {
      const t = {};
      if (req.session.userId) t.userId = req.session.userId;
      t.productId = item.product.id;
      t.quantity = item.quantity;
      t.totalCost = item.product.cost * item.quantity;
      t.createdAt = timeStamp;
      item.destroy();
      return t;
    });
    Promise.all(
      cart.map(item => {
        let newStock = item.product.stock - item.quantity;
        if (newStock > 0) {
          return Product.update(
            { stock: newStock },
            { where: { id: item.product.id } },
          );
        } else {
          return Product.update(
            { stock: 0, inStock: false },
            { where: { id: item.product.id } },
          );
        }
      }),
    );
    await Promise.all(
      transactions.map(item => Transaction.create({ ...item })),
    );
    const currentTransaction = await Transaction.findAll({
      where: { createdAt: timeStamp },
      include: [{ model: Product }],
    });
    res.send(currentTransaction);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
