//DB
const db = require('./db');
//MODELS
const Cart = require('./models/Cart');

const Product = require('./models/Product');
const Review = require('./models/Review');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

//ASSOCIATIONS
Product.hasMany(Review);
Transaction.belongsTo(Product);
User.hasMany(Review);
User.hasMany(Transaction);
Review.belongsTo(Product);
Cart.belongsTo(Product);
Cart.belongsTo(User);

//EXPORT
module.exports = {
  db,
  Cart,
  Product,
  Review,
  Transaction,
  User,
};
