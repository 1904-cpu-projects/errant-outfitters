const db = require('../db');
const Sequelize = require('sequelize');
//MODEL
const Review = db.define('review', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10,250]
    }
  }
});
//EXPORT
module.exports = Review;
