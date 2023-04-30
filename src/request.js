const uri = require('url');
const { ROUTES } = require('./const/route');

/**
 * Handles incoming HTTP requests and routes them to the appropriate controller function.
 *
 * @param {Object} req - The incoming HTTP request.
 * @param {Object} res - The response object to send back to the client.
 */
module.exports.handleRequest = async (req, res) => {
    const { method, url } = req;
    const { pathname, query } = uri.parse(url, true);
    const route = ROUTES.find(r => r.path === pathname && r.method === method);

    if (route) {
        if (method === 'GET') {
            handleParamsValidation(query, route, res);
        } else if (method === 'POST' || method === 'DELETE') {
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

/**
 * Extracts and validates parameters from the given input object according to the given route parameters.
 * Returns either an object containing the extracted parameters, or an array of any missing parameters.
 * 
 * @param {Object} input - The input object containing the parameters.
 * @param {Array} params - An array of parameter names that should be extracted and validated.
 * @returns {Object|Array} - An object containing the extracted parameters or an array of any missing parameters.
 */
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

/**
 * Validates the given input according to the given route, and calls the appropriate controller function. 
 * Returns the result of that function as a JSON response.
 *
 * @param {Object} input - The input object containing the parameters to be validated.
 * @param {Object} route - The route object containing information for validation and routing.
 * @param {Object} response - The HTTP response object to send back to the client.
 * @returns {Object} - The result of the controller function wrapped in a JSON object.
 */
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