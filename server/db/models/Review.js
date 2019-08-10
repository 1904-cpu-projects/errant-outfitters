const db = require('../db');
const Sequelize = require('sequelize');

const Review = db.define('review', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
//EXPORT
module.exports = Review;
