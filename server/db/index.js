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
// These are the existing associations where our seed.js wont fail
Guest.hasMany(Transaction);
Guest.hasMany(Cart);
Product.hasMany(Review);
Product.hasMany(Transaction);

Product.belongsTo(Cart);
User.hasMany(Review);
User.hasMany(Transaction);
Review.belongsTo(Product);
// Cart.belongsTo(Product);
Cart.belongsTo(User);



// These are the changes I made to the associations
// which does cause our seed.js to fail. Need to maybe
// work on this. 
// //Guest.hasMany(Transaction);
// //Guest.hasMany(Cart);
// Product.hasMany(Review);
// Product.hasMany(Transaction);
// //Product.hasMany(Cart);
// User.hasMany(Review);
// User.hasMany(Transaction);
// Review.belongsTo(Product);
// Cart.belongsTo(Product);
// Cart.belongsTo(User);


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
