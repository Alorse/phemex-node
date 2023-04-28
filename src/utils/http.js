const qs = require('querystring');
const axios = require('axios');
const { URLS } = require('../const/url');
const dotenv = require('dotenv');
const { buildSignature } = require('../utils/sign');

axios.defaults.baseURL = URLS.API_URL;

module.exports = {
  get,
  post,
  delete: del,
};

function createHeaders(urlPath, querystring = '', body = '') {
  dotenv.config();
  const expiry = Math.floor(Date.now() / 1000) + 2 * 60;
  const content = urlPath + querystring + expiry + body;
  const signature = buildSignature(content, process.env.SECRET);
  return {
    'Content-Type': 'application/json',
    'x-phemex-access-token': process.env.API_KEY,
    'x-phemex-request-expiry': expiry,
    'x-phemex-request-signature': signature,
  };
}

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
