//DB
const db = require('./db');
//MODELS
const Cart = require('./models/Cart');
const Guest = require('./models/Guest');
const Product = require('./models/Product');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

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
