const crypto = require('crypto');

module.exports.buildSignature = function (content, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(content)
    .digest('hex');
};
