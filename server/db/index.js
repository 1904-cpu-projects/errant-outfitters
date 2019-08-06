//DB
const db = require("./db");
//MODELS
const Cart = require("./models/Cart");
const Guest = require("./models/Guest");
const Product = require("./models/Product");
const Review = require("./models/Review");
const Transaction = require("./models/Transaction");
const User = require("./models/User");

//ASSOCIATIONS
Guest.hasMany(Transaction);
//Guest.hasMany(Cart);
Product.hasMany(Review);
Product.hasMany(Transaction);
<<<<<<< HEAD
//Product.hasMany(Cart);
User.hasMany(Review);
User.hasMany(Transaction);
//User.hasMany(Cart);
=======
Product.hasMany(Cart);
Review.belongsTo(Product);
User.hasMany(Transaction);
User.hasMany(Cart);
User.hasMany(Review);
>>>>>>> dev

//EXPORT
module.exports = {
  db,
  Cart,
  Guest,
  Product,
  Review,
  Transaction,
  User
};
