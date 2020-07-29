
const TelegramBot = require('node-telegram-bot-api')
const dialog = require('./dialogflow')
const video = require('./youtube')

const token = '1391618845:AAF23epMwamlbvbOmXpV2ghQPxt2kcB8CS8'

const bot = new TelegramBot(token,{polling: true})

bot.on('message', async (msg)=>{
    const chatId = msg.chat.id
    const dfResponse = await dialog.sendMsg(chatId.toString(), msg.text)

    let responseText = dfResponse.text
    //console.log(msg.text)
    if(dfResponse.intent === 'video'){
        responseText = await video.urlVideo(responseText, dfResponse.fields.video.stringValue)
        console.log(responseText)
    }
    bot.sendMessage(chatId, responseText)
})