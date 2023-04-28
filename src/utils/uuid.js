function r4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * @return {string}
 */
module.exports = {
  build() {
    return `${r4()}${r4()}-${r4()}-${r4()}-${r4()}-${r4()}${r4()}${r4()}`;
  },
};
