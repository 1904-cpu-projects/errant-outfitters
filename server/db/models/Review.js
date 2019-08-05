const db = require("../db");
const Sequelize = require("sequelize");

const Review = db.define("review", {
  title: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  author: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10, 500]
    }
  }
});
//EXPORT
module.exports = Review;
