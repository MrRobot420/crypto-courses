import express from 'express'
import config from 'config'
import { initWebSocketClient, manageWebSocket } from './services/websocket'
import { Connection } from './storage'


const app = express()

const PORT = config.get('PORT')
const COIN_DATABASE_URL = config.get('MONGO.localUrl') as string

const coins = [
    'eth', 
    'btc', 
    'ltc', 
    'bch', 
    'xrp', 
    'algo', 
    'link', 
    'usdt', 
    'uni', 
    'xlm', 
    'mkr', 
    'matic', 
    'shib', 
    'ada', 
    'axs', 
    'sand', 
    'aave', 
    'omg', 
    'sushi'
]

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
    new Connection(COIN_DATABASE_URL)

    coins.forEach(coin => {
        const ws = initWebSocketClient('wss://ws.bitstamp.net/')
        manageWebSocket(ws, `${coin}eur`)
    })
})