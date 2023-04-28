
const { loadGAccountInfo, loadGActiveOrders } = require('./controllers/account');
const http = require('http');
const dotenv = require('dotenv');

const server = http.createServer(async (req, res) => {
    let data = {
        msg: 'Not Found'
    }
    switch (req.url) {
        case '/account':
            data = await loadGAccountInfo('USDT');
            res.statusCode = 200;
            break;
        case '/active-orders':
            data = await loadGActiveOrders('ETHUSDT');
            res.statusCode = 200;
            break;
        default:
            res.statusCode = 404;
            break;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
});

dotenv.config();
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});