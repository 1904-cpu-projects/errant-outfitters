const router = require('express').Router();
const {checkoutStripe, checkoutId} = require('../utils/checkout');

router.post('/', async (req,res,next) => {
  const cart = req.body;
  try{
    (res.send( await checkoutStripe(cart)))
  } catch(e) {
    next(e)
  }
});

module.exports = router;
