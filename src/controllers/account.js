module.exports.loadGAccountInfo = async function (params) {
  const { currency } = params;
  const { gAccountPositions } = require('../api/account');
  const { data, error } = await gAccountPositions(currency);
  if (data) {
    return data
  }
  if (error) {
    return error
  }
}