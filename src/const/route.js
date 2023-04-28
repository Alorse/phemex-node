const { loadGAccountInfo } = require('../controllers/account');
const { loadGActiveOrders } = require('../controllers/trade');

module.exports.ROUTES = [
    {
        path: '/account',
        controller: loadGAccountInfo,
        params: ['currency']
    },
    {
        path: '/active-orders',
        controller: loadGActiveOrders,
        params: ['symbol']
    }
];