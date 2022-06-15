export const getColorPrice = (price) => {
  return price >= 0 ? 'true' : '' 
};

export const formatPercent = number => {
  return `${new Number(number).toFixed(2)}`
};

export const formatDollar = (number, maximumSignificantDigits) => {
  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'usd',
      maximumSignificantDigits
    }
  ).format(number)
}