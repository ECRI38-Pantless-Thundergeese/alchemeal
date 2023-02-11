const capitalizeWord = (str = null) =>
  str && str.length > 0
    ? str[0].toUpperCase() + str.slice(1).toLowerCase()
    : str;

module.exports = { capitalizeWord };
