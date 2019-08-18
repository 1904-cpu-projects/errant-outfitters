//DB
const db = require('./db');
//MODELS
const Cart = require('./models/Cart');
const Guest = require('./models/Guest');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

//ASSOCIATIONS
// These are the existing associations where our seed.js wont fail
Product.hasMany(Review);
Product.hasMany(Transaction);
User.hasMany(Review);
User.hasMany(Transaction);
Review.belongsTo(Product);
Cart.belongsTo(Product);
Cart.belongsTo(User);

//EXPORT
module.exports = {
  db,
  Cart,
  Guest,
  Product,
  Review,
  Transaction,
  User,
};
