const db = require('../db');
const Sequelize = require('sequelize');
//MODEL
const Transaction = db.define('transaction', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  totalCost: {
    type: Sequelize.FLOAT,
  },
  guestId: {
    type: Sequelize.STRING
  }
});
//EXPORT
module.exports = Transaction;
