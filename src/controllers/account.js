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