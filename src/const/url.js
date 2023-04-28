const dotenv = require('dotenv');

dotenv.config();
module.exports.URLS = {
  WS_URL: `wss://${process.env.WS_HOST}/ws/`,
  API_URL: `https://${process.env.API_HOST}`,
  MARKETS: `/v1/exchange/public/products`,
  PRODUCTS: `/public/products`,
  ORDERBOOK: `/md/orderbook`,
  TRADES: `/md/trade`,

  ORDER_ACTIVE_LIST: `/orders/activeList`,
  ORDER_PLACE: `/orders`,
  ORDER_CANCEL: `/orders/cancel`,

  //USDT ORDERS
  GACCOUNT_POSITIONS: `/g-accounts/positions`,
  GORDER_ACTIVE_LIST: `/g-orders/activeList`,
  GORDER_PLACE: `/g-orders`,
  GORDER_CANCEL: `/g-orders/cancel`,
};
