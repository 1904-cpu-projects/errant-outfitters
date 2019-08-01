const db = require('./db');
//MODEL
const User = db.define('user', {
	id: {
		defaultValue: Sequelize.UUIDV4,
  	primaryKey: true,
    type: Sequelize.UUID
	},
	name: {
		type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  class: {
    type: Sequelize.ENUM('warrior', 'mage', 'rouge')
  }
});
//EXPORT
module.exports = {
  User
}
