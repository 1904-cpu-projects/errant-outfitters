const router = require("express").Router();
const { Cart, Product, User } = require("../db/index.js");

// Helper function to determine guest or user status
// sends back object with {memberStatus, memberId}
function determineUser(sessionID, session) {
  const result = {};
  if(session.userId) {
    result.memberStatus = 'user';
    result.memberId = session.userId;
  }
  else {
    result.memberStatus = 'guest';
    result.memberId = sessionID;
  }
  return result;
}

// This will send to the client all items in user cart as a list
// We are relying on the session cookie to supply us with the relevant
// information though. 
router.get("/getCart", async (req, res, next) => {
  const member = determineUser(req.sessionID, req.session);
  // Get all cart rows based on that information and send it
  console.log(member);
  try{
    const [_, userCart] = await Cart.findAll({ where: { ...member }});
    // Sends the cart information to client as array
    res.status(202).send(userCart);
  }
  catch(e){
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    next(e);
  }
});

// Updates the relevant row in the Cart table based on req.body
// and result from member
router.put("/changeCart/:productId", async (req, res, next) => {
  const member = determineUser(req.session);

  try{
    const product = await Cart.update({ where: { ...member, ...req.body }});
    res.status(202).send(product);
  }
  catch(e){
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);    
  }
});

router.post("/createCart", async (req, res, next) => {
  const member = determineUser(req.session);

  try{
    const product = await Cart.create({ where: { ...member, ...req.body}});
    res.status(201).send();
  }
  catch(e){
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);    
  }
});

router.delete("/deleteCart", async (req, res, next) => {
  const member = determineUser(req.session);

  try{
  const product = await Cart.delete({ where: { ...member, ...req.body}});
  res.status(202).send();
  }
  catch(e){
    // for now just log out any error
    // eventually we send the error information
    // to the client and process
    console.log(e);
    res.send(400);    
  }
});

module.exports = router;
