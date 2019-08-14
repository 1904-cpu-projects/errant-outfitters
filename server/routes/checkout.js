const router = require('express').Router();
const {checkoutStripe, checkoutId} = require('../utils/checkout');

router.post('/', async (req,res,next) => {
  const cart = req.body;
  console.log(cart)
  console.log(checkoutId)
  try{
    (res.send( await checkoutStripe(cart)))
  } catch(e) {
    next(e)
  }
});

module.exports = router;
