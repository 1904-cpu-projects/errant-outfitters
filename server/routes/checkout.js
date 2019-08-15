const router = require('express').Router();
const { checkoutStripe, checkoutId } = require('../utils/checkout');
const { Cart, Product, Transaction } = require('../db/index');

router.post('/', async (req, res, next) => {
  const cart = req.body;
  try {
    res.send(await checkoutStripe(cart));
  } catch (e) {
    next(e);
  }
});

router.post('/reconcile', async (req,res,next) => {
  const cart = req.body;
  try{
    const removeCart = await cart.map( (item) => {
      Cart.destroy({
        where: { id: item.id}
      })
    });
    const reduceStock = await cart.map( (item) => {
      Product.decrement(
        'stock',
        {by: item.quantity, where: {id: item.productId}}
      )
    });
    const postTransaction = await cart.map( (item) => {
      Transaction.create({
        quantity: item.quantity,
        totalCost: item.quantity * item.product.cost,
        productId: item.productId,
        userId: item.memberId
      })
    })
    res.send('purchase reconciled')
  } catch(e) {
    next(e);
  }
})
module.exports = router;
