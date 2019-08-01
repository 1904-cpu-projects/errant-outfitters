const Sequelize = require('sequelize');
const {syncAndSeed, seed} = require('./seed')

const DBNAME = 'errant';
const db = new Sequelize(process.env.DATABASE_URL || `postgres:localhost/${DBNAME}`);

syncAndSeed

//EXPORT
module.exports = {
  db
};
