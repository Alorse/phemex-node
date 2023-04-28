
const http = require('http');
const dotenv = require('dotenv');
const url = require('url');
const { ROUTES } = require('./const/route');

let data
const handleRequest = async (req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const route = ROUTES.find(r => r.path === pathname);
    if (route) {
        const params = {};
        for (const param of route.params) {
            if (query[param]) {
                params[param] = query[param];
            } else {
                res.statusCode = 400; // Bad request
                data = { msg: `Missing parameter: ${param}` };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return;
            }
        }
        data = await route.controller(params);
        res.statusCode = 200;
    } else {
        res.statusCode = 404;
        data = { msg: 'Not Found' };
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

const server = http.createServer(handleRequest);

dotenv.config();
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});