const router = require('express').Router();
const { Product, Transaction } = require('../db/index');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.session.userId },
      include: [{ model: Product }],
    });
    res.send(transactions);
  } catch (e) {
    res.status(500).send('There was an error getting your transaction history');
  }
});

module.exports = router;
