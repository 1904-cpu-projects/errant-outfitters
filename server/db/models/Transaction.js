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
});
//EXPORT
module.exports = Transaction;
