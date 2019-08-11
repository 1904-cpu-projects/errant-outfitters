const router = require('express').Router();
const { Cart, Product } = require('../db/index.js');

// Helper function to determine guest or user status
// sends back object with {memberStatus, memberId}
function determineUser(sessionID, session) {
  const result = {};
  if (session.userId) {
    result.memberStatus = 'user';
    result.memberId = session.userId;
  } else {
    result.memberStatus = 'guest';
    result.memberId = sessionID;
  }
  return result;
}

// This will send to the client all items in user cart as a list
// We are relying on the session cookie to supply us with the relevant
// information though.
router.get('/getCart', async (req, res, next) => {
  const member = determineUser(req.sessionID, req.session);
  // Get all cart rows based on that information and send it
  try {
    const userCart = await Cart.findAll({
      where: { memberId: member.memberId },
    });
    // Sends the cart information to client as array
    res.status(202).send(
      userCart.map(item => {
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    );
  } catch (e) {
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    next(e);
  }
});

// The intent of this route is to provide the client with relevant information
// for all their cart row entries. So we just get a request, and provide an array
// of all the product information.
router.get('/getCartProducts', async (req, res, next) => {
  const member = determineUser(req.sessionID, req.session);
  try {
    const cart = await Cart.findAll({ where: { ...member } });
    const products = await Promise.all(
      cart.map(i => Product.findByPk(i.productId)),
    );
    res.status(200).send(products);
  } catch (e) {
    next(e);
  }
});

// Updates the relevant row in the Cart table based on req.body
// and result from member
router.put('/changeCart/:productId', async (req, res, next) => {
  const member = determineUser(req.sessionID, req.session);

  try {
    const product = await Cart.update({ where: { ...member, ...req.body } });
    res.status(202).send(product);
  } catch (e) {
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);
  }
});

router.post('/createCart', async (req, res, next) => {
  const member = determineUser(req.sessionID, req.session);
  try {
    const productExists = await Cart.findOne({
      where: { productId: req.body.productId, ...member },
    });
    let product;
    if (productExists === null)
      product = await Cart.create({ ...member, ...req.body });
    else {
      product = await Cart.update(
        { quantity: productExists.quantity + req.body.quantity },
        { where: { id: productExists.id } },
      );
      console.log(product);
    }
    res.status(201).send();
  } catch (e) {
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);
  }
});

router.delete('/deleteCart', async (req, res, next) => {
  const member = determineUser(req.session);

  try {
    const product = await Cart.delete({ where: { ...member, ...req.body } });
    res.status(202).send();
  } catch (e) {
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);
  }
});

module.exports = router;
