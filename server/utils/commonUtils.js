const crypto = require('crypto');

function hashPassword(password) {
  const secret = process.env.SALT_HASH || "I'm a teapot";
  return crypto
    .createHmac('sha256', secret)
    .update(password)
    .digest('hex');
}

module.exports = { hashPassword };
