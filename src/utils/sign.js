const crypto = require('crypto');

/**
 * Builds an HMAC signature for a given content and secret key using the sha256 algorithm.
 * @param {string} content - The content to sign, in string format.
 * @param {string} secret - The secret key to use for the HMAC signature, in string format.
 * @returns {string} - The generated signature, in hexadecimal format.
 */
module.exports.buildSignature = function (content, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(content)
    .digest('hex');
};
