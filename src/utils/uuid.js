/**
 * Generates a random hexadecimal string with the format: "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".
 * @returns {string} - The generated random string.
 */
function r4() {
  // Generate a random hexadecimal number
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

module.exports = {
  /**
   * Generates a UUID (Universally Unique IDentifier) consisting of five randomized
   * hexadecimal numbers separated by hyphens, with a total of 36 characters.
   * @returns {string} - The generated UUID.
   */
  build() {
    // Concatenate five randomized hexadecimal numbers separated by hyphens
    return `${r4()}${r4()}-${r4()}-${r4()}-${r4()}-${r4()}${r4()}${r4()}`;
  },
};