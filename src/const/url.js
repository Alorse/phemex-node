const dotenv = require('dotenv');

dotenv.config();
module.exports.URLS = {
  API_URL: `https://${process.env.API_HOST}`,
  MARKETS: `/v1/exchange/public/products`,
  PRODUCTS: `/public/products`,
  ORDERBOOK: `/md/orderbook`,
  TRADES: `/md/trade`,

  // Hedged Contract Rest API
  GACCOUNT_POSITIONS: `/g-accounts/positions`,
  GORDER_ACTIVE_LIST: `/g-orders/activeList`,
  GORDER_PLACE: `/g-orders`,
  GORDER_CANCEL: `/g-orders/cancel`,
};
