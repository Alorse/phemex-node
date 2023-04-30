/**
 * Retrieves account information for a Hedged chosen global currency from the Phemex API.
 *
 * @param {Object} params - An object containing the parameters for the request.
 * @param {string} params.currency - The global currency to retrieve account information for.
 * @returns {Promise<JSON>} - A promise that resolves with the account information as a JSON object.
 */
module.exports.loadGAccountInfo = async function (params) {
  const { currency } = params;
  const { loadGAccountPositions } = require('../api/account');
  const { data, error } = await loadGAccountPositions(currency);
  if (data) {
    return data
  }
  if (error) {
    return error
  }
}