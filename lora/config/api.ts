export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`

export const CoinsInfo = () =>
  `https://api.coingecko.com/api/v3/coins`;

export const GlobalInfo = () =>
  `https://api.coingecko.com/api/v3/global`;

export const ExchangesInfo = () => 
  `https://api.coingecko.com/api/v3/exchanges`
  export const NewsInfo = (type) => 
  `https://bing-news-search1.p.rapidapi.com/news/search?q=${type}&safeSearch=Off&textFormat=Raw&count=100&setLang=EN`
