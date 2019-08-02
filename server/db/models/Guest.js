const db = require('../db');
const Sequelize = require('sequelize');
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
module.exports = Guest;
