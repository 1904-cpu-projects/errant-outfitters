const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./Product');
//MODEL
const Cart = db.define('cart', {
  memberStatus: {
    type: Sequelize.ENUM('guest', 'member')
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});
//EXPORT
module.exports = Cart;
