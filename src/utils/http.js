// Require modules
const qs = require('querystring');
const axios = require('axios');
const { URLS } = require('../const/url');
const dotenv = require('dotenv');
const { buildSignature } = require('../utils/sign');

// Set the default API URL for axios requests
axios.defaults.baseURL = URLS.API_URL;

// Export the functions
module.exports = {
  get,
  post,
  delete: del,
};

/**
 * Create the headers with authentication information
 * @param {string} urlPath - URL path for the API request
 * @param {string} querystring - Querystring for the API request
 * @param {string} body - Body for the API request
 * @returns {object} - Headers object with the required authentication information
 */
function createHeaders(urlPath, querystring = '', body = '') {
  dotenv.config();

  // Set an expiry time of 2 minutes from the current time
  const expiry = Math.floor(Date.now() / 1000) + 2 * 60;

  // Combine the URL path, querystring, expiry, and body to create the content string
  const content = urlPath + querystring + expiry + body;

  // Build the signature using the content string and the API secret key
  const signature = buildSignature(content, process.env.SECRET);

  // Return an object with the required headers and values
  return {
    'Content-Type': 'application/json',
    'x-phemex-access-token': process.env.API_KEY,
    'x-phemex-request-expiry': expiry,
    'x-phemex-request-signature': signature,
  };
}

/**
 * Send a GET request to the API
 * @param {string} url - URL for the API request
 * @param {object} options - Optional parameters for the API request
 * @param {object} options.query - Query parameters for the API request
 * @returns {object} - Response object containing data or error information
 */
async function get(url, { query } = {}) {
  try {
    const querystring = query ? qs.stringify(query) : '';
    const headers = createHeaders(url, querystring);

    const response = await axios({
      url,
      method: 'get',
      headers,
      params: query,
      paramsSerializer() {
        return querystring;
      },
    });

    if (response.status === 200) {
      // Extract the data, error, or result information from the response
      const { code, msg, data, error, result } = response.data;

      if (code === 0) {
        return { data };
      }

      if (result) {
        return { data: result };
      }

      if (error) {
        return { error };
      }

      return { error: { code, msg } };
    }

    return { error: {}, response };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}

/**
 * Send a POST request to the API
 * @param {string} url - URL for the API request
 * @param {object} options - Optional parameters for the API request
 * @param {object} options.query - Query parameters for the API request
 * @param {object} options.params - Parameters for the API request body
 * @returns {object} - Response object containing data or error information
 */
async function post(url, { query, params }) {
  try {
    const querystring = query ? qs.stringify(query) : '';
    const body = JSON.stringify(params);
    const headers = createHeaders(url, querystring, body);

    const response = await axios({
      url,
      method: 'post',
      headers: headers,
      params: query,
      paramsSerializer() {
        return querystring;
      },
      data: body,
    });

    if (response.status === 200) {
      // Extract the data, error, or result information from the response
      const { code, msg, data, error, result } = response.data;

      if (code === 0) {
        return { data };
      }

      if (result) {
        return { data: result };
      }

      if (error) {
        return { error };
      }

      return { error: { code, msg } };
    }

    return { error: {}, response };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}

/**
 * Send a DELETE request to the API
 * @param {string} url - URL for the API request
 * @param {object} options - Optional parameters for the API request
 * @param {object} options.query - Query parameters for the API request
 * @returns {object} - Response object containing data or error information
 */
async function del(url, { query } = {}) {
  try {
    const querystring = query ? qs.stringify(query) : '';
    const headers = createHeaders(url, querystring);

    const response = await axios({
      url,
      method: 'delete',
      headers,
      params: query,
      paramsSerializer() {
        return querystring;
      },
    });

    if (response.status === 200) {
      // Extract the data, error, or result information from the response
      const { code, msg, data, error, result } = response.data;

      if (code === 0) {
        return { data };
      }

      if (result) {
        return { data: result };
      }

      if (error) {
        return { error };
      }

      return { error: { code, msg } };
    }

    return { error: {}, response };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}