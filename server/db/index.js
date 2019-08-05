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
Guest.hasMany(Cart);
Product.hasMany(Review);
Product.hasMany(Transaction);
Product.hasMany(Cart);
Review.belongsTo(User);
User.hasMany(Transaction);
User.hasMany(Cart);

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
