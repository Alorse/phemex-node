const { URLS } = require('../const/url');
const http = require('../utils/http');

module.exports.loadMarkets = function () {
  return http.get(URLS.MARKETS);
};

module.exports.loadProducts = function () {
  return http.get(URLS.PRODUCTS);
};

module.exports.loadOrderbook = function (symbol) {
  return http.get(URLS.ORDERBOOK, { query: { symbol, id: 1 } });
};

module.exports.loadTrades = function (symbol) {
  return http.get(URLS.TRADES, { query: { symbol } });
};
