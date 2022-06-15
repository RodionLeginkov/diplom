const TG = require('node-telegram-bot-api');
const axios = require('axios');
const config = require('./config').app;
const { formatMoney } = require("./utils/money.js"); 
const bot = new TG(config.botToken, { polling: true})

const cryptoToken1 = 'BTC'
const cryptoToken2 = 'USDT'

bot.onText(/\/price (.+)/, async(msg,data) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Wait...')

  const [cryptoToken1, cryptoToken2 = 'USDT'] = data[1].split(' ')

  try{
    const coinPrice = await axios.get(`https://www.binance.com/api/v3/avgPrice?symbol=${cryptoToken1.toUpperCase()}${cryptoToken2.toUpperCase()}`);
    if (!coinPrice) {
      bot.sendMessage(chatId, 'Invalid symbol.');
    }
    const newMessage = cryptoToken2 === 'USDT' ? formatMoney(coinPrice.data.price) : `${cryptoToken2} ${coinPrice.data.price}`
    bot.sendMessage(chatId, newMessage);
  } catch(error) {
    bot.sendMessage(chatId, 'Invalid symbol.');
  }
})

bot.onText(/\/news/, async(msg,data) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'You can find all news here: http://localhost:3000')
})

bot.onText(/\/send/, async(msg,data) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'You can send eth here: http://localhost:3001')
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id

  switch (msg.text) {
    case '/start':
      bot.sendMessage(chatId, 'Hi there! I am Lora Crypto Bot.')
      break

    default:
      break
  }
})

