const db = require('./db');
//MODEL
const Guest = db.define('guest', {
	//id? or sessionId?
	id: {
		defaultValue: Sequelize.UUIDV4,
  	primaryKey: true,
    type: Sequelize.UUID
	}
});
//EXPORT
module.exports = {
  Guest
}
