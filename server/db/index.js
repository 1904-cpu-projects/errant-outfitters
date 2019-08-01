//DB
const db = require('./db');
//MODELS
const Cart = require('./Cart');
const Guest = require('./Guest');
const Product = require('./Product');
const Transaction = require('./Transaction');
const User = require('./User');
const model = {
  Cart,
  Guest,
  Product,
  Transaction,
  User,
};
//SEED DATA
const {syncAndSeed, seed} = require('./seed')
//EXPORT
module.export = {
  db,
  model,
  seed,
  syncAndSeed,
}
