const db = require('./db');
const Product = require('./Product');
const User = require('./User');
const Guest = require('./Guest');
//MODEL
const Transaction = db.define('transaction', {
  id: {
  	autoIncerment: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  totalCost: {
    type: Sequelize.FLOAT
  }
});
//ASSOCIATION
Transaction.hasOne(Product);
Transaction.hasOne(User);
Transaction.hasOne(Guest);
//EXPORT
module.exports = {
  Transaction
}
