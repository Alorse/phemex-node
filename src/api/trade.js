const { URLS } = require('../const/url');
const http = require('../utils/http');
const uuid = require('../utils/uuid');

/**
 * Retrieves a list of active orders for a given symbol from the Phemex API.
 * @param {string} symbol - Symbol string for the market, e.g. 'BTCUSDT'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.loadActiveOrders = function (symbol) {
  return http.get(URLS.ORDER_ACTIVE_LIST, { query: { symbol } });
};

/**
 * Retrieves a list of Hedged active orders for a given symbol from the Phemex API.
 * @param {string} symbol - Symbol string for the market, e.g. 'BTCUSDT'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
module.exports.loadGActiveOrders = function (symbol) {
  return http.get(URLS.GORDER_ACTIVE_LIST, { query: { symbol } });
};

module.exports.placeOrder = function ({ symbol,
  side,
  priceEp,
  orderQty,
  ordType,
  postOnly = false,
  reduceOnly = false,
  timeInForce = 'GoodTillCancel'
}) {
  const params = {
    clOrdID: uuid.build(),
    symbol,
    side,
    priceEp,
    orderQty,
    ordType,
    postOnly,
    reduceOnly,
    timeInForce,
  };
  return http.post(URLS.ORDER_PLACE, { params });
};

module.exports.placeGOrder = function ({
  symbol,
  side,
  posSide,
  priceRp = '1',
  orderQtyRq,
  ordType,
  reduceOnly = false,
  timeInForce = 'GoodTillCancel'
}) {
  const params = {
    clOrdID: uuid.build(),
    symbol,
    reduceOnly,
    orderQtyRq,
    ordType,
    priceRp,
    side,
    posSide,
    timeInForce,
  };
  return http.post(URLS.GORDER_PLACE, { params });
};

module.exports.cancelOrder = function (symbol, orderID) {
  return http.delete(URLS.ORDER_CANCEL, { query: { symbol, orderID } });
};

module.exports.cancelGOrder = function (symbol, orderID, posSide) {
  return http.delete(URLS.GORDER_CANCEL, { query: { symbol, orderID, posSide } });
};