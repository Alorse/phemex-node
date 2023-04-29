module.exports.loadGActiveOrders = async function (params) {
    const { symbol } = params;
    const { gLoadActiveOrders } = require('../api/trade');
    const { data, error } = await gLoadActiveOrders(symbol);
    if (data) {
        return data
    }
    if (error) {
        return error
    }
}

async function placeOrder() {
    const { placeOrder } = require('../api/trade');
    const { data, error } = await placeOrder({
        symbol: 'BTCUSD',
        side: 'Buy',
        priceEp: 100000000,
        orderQty: 11,
        ordType: 'Limit',
    });
    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}

module.exports.gPlaceOrder = async function (params) {
    const { symbol, side, posSide, orderQtyRq, ordType, priceRp } = params;
    const { gPlaceOrder } = require('../api/trade');
    const info = {
        symbol: symbol,
        side: side,
        posSide: posSide,
        orderQtyRq: orderQtyRq,
        ordType: ordType,
        priceRp: priceRp
    };
    const { data, error } = await gPlaceOrder(info);
    if (data) {
        return data
    }
    if (error) {
        return error
    }
}

async function gPlaceOrder() {
    const { gPlaceOrder } = require('../api/trade');
    const { data, error } = await gPlaceOrder({
        symbol: 'ADAUSDT',
        side: 'Buy',
        posSide: 'Short',
        orderQtyRq: '10',
        ordType: 'Market',
    });
    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}

async function cancelOrder(symbol, orderID) {
    const { gCancelOrder } = require('../api/trade');
    const { data, error } = await gCancelOrder(symbol, orderID, 'Long');
    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}
