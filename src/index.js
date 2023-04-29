
const http = require('http');
const dotenv = require('dotenv');
const uri = require('url');
const { ROUTES } = require('./const/route');

const handleRequest = async (req, res) => {
    const { method, url } = req;
    const { pathname, query } = uri.parse(url, true);
    const route = ROUTES.find(r => r.path === pathname && r.method === method);

    if (route) {
        if (method === 'GET') {
            handleParamsValidation(query, route, res);
        } else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                let data;
                try {
                    data = JSON.parse(body);
                } catch (err) {
                    result = { error: `error: ${err}` };
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                    return;
                }
                handleParamsValidation(data, route, res);
            });
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
};

function extractParams(input, params) {
    const result = {};
    const missing = [];
    for (const param of params) {
        if (input[param] !== undefined) {
            result[param] = input[param];
        } else {
            missing.push(param);
        }
    }
    return missing.length ? missing : result;
}

async function handleParamsValidation(input, route, response) {
    const params = extractParams(input, route.params);
    let result
    if (Array.isArray(params)) {
        result = { error: `missing parameter(s): ${params.join(', ')}` };
        response.statusCode = 400;
    } else {
        result = await route.controller(params);
        response.statusCode = 200;
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(result));
}


const server = http.createServer(handleRequest);

dotenv.config();
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});