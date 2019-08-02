//DB
const db = require('./db');
//MODELS
const Cart = require('./Cart');
const Guest = require('./Guest');
const Product = require('./Product');
const Transaction = require('./Transaction');
const User = require('./User');

//ASSOCIATIONS
Transaction.hasOne(Product);
Transaction.hasOne(User);
Transaction.hasOne(Guest);
Cart.hasOne(Product);

//EXPORT
module.exports = {
  db,
  Cart,
  Guest,
  Product,
  Transaction,
  User,
};
