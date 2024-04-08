const { createHash } = require('crypto');

function encrypt(string) {
  return createHash('sha256').update(string).digest('hex');
}

console.log(encrypt('password123'));
console.log(encrypt('password123'));

module.exports = encrypt;
