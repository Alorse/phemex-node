const { loadGAccountInfo } = require('../controllers/account');
const { loadGActiveOrders, placeGOrder, cancelGOrder } = require('../controllers/trade');

module.exports.ROUTES = [
    {
        path: '/account',
        method: 'GET',
        controller: loadGAccountInfo,
        params: ['currency']
    },
    {
        path: '/active-orders',
        method: 'GET',
        controller: loadGActiveOrders,
        params: ['symbol']
    },
    {
        path: '/place-order',
        method: 'POST',
        controller: placeGOrder,
        params: ['symbol', 'side', 'posSide', 'orderQtyRq', 'ordType', 'priceRp']
    },
    {
        path: '/cancel-order',
        method: 'DELETE',
        controller: cancelGOrder,
        params: ['symbol', 'orderID', 'posSide']
    }
];