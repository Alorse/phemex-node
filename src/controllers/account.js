module.exports.loadGAccountInfo = async function (currency) {
  const { gAccountPositions } = require('../api/account');
  const { data, error } = await gAccountPositions(currency);
  if (data) {
    return data
  }
  if (error) {
    return error
  }
}