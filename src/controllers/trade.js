module.exports.loadGActiveOrders = async function (params) {
    const { symbol } = params;
    const { loadGActiveOrders } = require('../api/trade');
    const { data, error } = await loadGActiveOrders(symbol);
    if (data) {
        return data
    }
    if (error) {
        return error
    }
}

module.exports.placeGOrder = async function (params) {
    const { symbol, side, posSide, orderQtyRq, ordType, priceRp } = params;
    const { placeGOrder } = require('../api/trade');
    const info = {
        symbol: symbol,
        side: side,
        posSide: posSide,
        orderQtyRq: orderQtyRq,
        ordType: ordType,
        priceRp: priceRp
    };
    const { data, error } = await placeGOrder(info);
    if (data) {
        return data
    }
    if (error) {
        return error
    }
}

module.exports.cancelGOrder = async function (params) {
    const { symbol, orderID, posSide } = params;
    const { cancelGOrder } = require('../api/trade');
    const { data, error } = await cancelGOrder(symbol, orderID, posSide);
    if (data) {
        return data
    }
    if (error) {
        return error
    }
}
