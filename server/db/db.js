const Sequelize = require("sequelize");

//CONNECTION TO DATABASE
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres:localhost/errant`,
  { logging: false }
);

//EXPORT
module.exports = db;
