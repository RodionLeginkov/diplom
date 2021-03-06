const formatMoney = (value, currency = "USD", locale = "en-US") => {
  return Intl.NumberFormat(locale, { style: "currency", currencyDisplay: "symbol", currency }).format(value);
};

module.exports = {
  formatMoney,
};