const { URLS } = require('../const/url');
const http = require('../utils/http');

/**
 * Retrieves Hedged account data and pass orders for a given currency from the Phemex API.
 * @param {string} currency - Currency string for the market, e.g. 'USDT'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.loadGAccountPositions = function (currency) {
    return http.get(URLS.GACCOUNT_POSITIONS, { query: { currency } });
};