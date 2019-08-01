const db = require('./db');
const Product = require('./Product');
//MODEL
const Cart = db.define('cart', {
	id: {
  	autoincrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  memberStatus: {
    type: Sequelize.ENUM('guest', 'member')
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});
//ASSOCIATION
Cart.hasOne(Product);
//EXPORT
module.exports = {
  Cart
};
