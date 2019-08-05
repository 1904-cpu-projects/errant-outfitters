const crypto = require('crypto');

function hashPassword(password) {
    const secret = "I'm a teapot" || process.env.HASH_SALT;
    return crypto.createHmac('sha256', secret)
	  .update(password)
	  .digest('hex');
}

module.exports = {hashPassword};
