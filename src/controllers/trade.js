/**
 * Retrieves a list of Hedged active orders for a given contract and position side from the Phemex API.
 * @param {Object} params - An object containing the parameters for the request.
 * @param {string} params.symbol - The trading symbol for the order, e.g. 'BTCUSDT'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
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

/**
 * Places a global Hedged order on the Phemex API.
 *
 * @param {Object} params - An object containing the parameters for the order.
 * @param {string} params.symbol - The trading symbol for the order, e.g. 'BTCUSDT'.
 * @param {string} params.side - The order side, either 'Buy' or 'Sell'.
 * @param {string} params.posSide - The position side, either 'Merged', 'Long', or 'Short'.
 * @param {number} params.orderQtyRq - The order quantity.
 * @param {string} params.ordType - The order type, either 'Limit' or 'Market'.
 * @param {number} params.priceRp - Real price, required for Limit order.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
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

/**
 * Cancels a Hedged global order on the Phemex API.
 *
 * @param {Object} params - An object containing the parameters for the request.
 * @param {string} params.symbol - The trading symbol for the order, e.g. 'BTCUSDT'.
 * @param {string} params.orderID - The order ID.
 * @param {string} params.posSide - The position side, either 'Merged', 'Long', or 'Short'.
 * @returns {Promise<JSON>} - A promise that resolves with the order information as a JSON object.
 */
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
