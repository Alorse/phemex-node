const { URLS } = require('../const/url');
const http = require('../utils/http');
const uuid = require('../utils/uuid');

/**
 * Retrieves a list of Hedged active orders for a given symbol from the Phemex API.
 * @param {string} symbol - Symbol string for the market, e.g. 'BTCUSDT'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.loadGActiveOrders = function (symbol) {
  return http.get(URLS.GORDER_ACTIVE_LIST, { query: { symbol } });
};

/**
 * Places a conditional Hedged order with the Phemex API.
 * @param {string} symbol - Symbol string for the market, e.g. "BTCUSDT".
 * @param {string} side - Order direction, "Buy" or "Sell".
 * @param {string} posSide - "Merged" for oneway mode, "Long"/"Short" for hedge mode.
 * @param {string} priceRp - The order price in execution price. Real price, required for limit order.
 * @param {string} orderQtyRq - Order real quantity.
 * @param {string} ordType - Order type, default to "Limit" -  "Market"/"Limit"/"Stop".
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.placeGOrder = function ({
  symbol,
  side,
  posSide,
  priceRp = '1',
  orderQtyRq,
  ordType
}) {
  const params = {
    clOrdID: uuid.build(),
    symbol,
    orderQtyRq,
    ordType,
    priceRp,
    side,
    posSide,
  };
  return http.post(URLS.GORDER_PLACE, { params });
};

/**
 * Cancel Hedged order with the Phemex API.
 * @param {string} symbol - Symbol string for the market, e.g. "BTCUSDT".
 * @param {string} orderID - OrderID to cancel.
 * @param {string} posSide - Position direction, "Long"/"Short" for hedge mode.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.cancelGOrder = function (symbol, orderID, posSide) {
  return http.delete(URLS.GORDER_CANCEL, { query: { symbol, orderID, posSide } });
};