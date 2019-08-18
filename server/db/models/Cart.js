const db = require('../db');
const Sequelize = require('sequelize');

//MODEL
const Cart = db.define('cart', {
  // productId: {
  //   type: Sequelize.STRING,
  //   //    allowNull: false
  // },
  memberStatus: {
    type: Sequelize.ENUM('guest', 'user'),
  },
  memberId: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

// Since some decisions need to be made before we create
// the row in the Cart. We should call this function to
// create a new row. Where this calls Cart.create() for
// us

// Cart.addToCart = function(type = 'guest', mId, pId, quantity) {};

//EXPORT
module.exports = Cart;
