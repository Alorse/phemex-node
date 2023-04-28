async function loadMarkets() {
    const { loadMarkets } = require('../api/market');
    const { data, error } = await loadMarkets();
    if (data) {
        console.log(data);
        return data
    }
    if (error) {
        console.log(error);
        return error
    }
}

async function loadProducts() {
    const { loadProducts } = require('../api/market');
    const { data, error } = await loadProducts();
    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}

async function loadOrderbook(symbol) {
    const { loadOrderbook } = require('../api/market');
    const { data, error } = await loadOrderbook(symbol);
    if (data) {
        console.log(data);
    }
    if (error) {
        console.error(error);
    }
}

async function loadTrades(symbol) {
    const { loadTrades } = require('../api/market');
    const { data, error } = await loadTrades(symbol);
    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}
