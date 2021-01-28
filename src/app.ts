import express from 'express'
import config from 'config'
import { initWebSocketClient, manageWebSocket } from './services/websocket'
import { Connection } from './storage'


const app = express()

const PORT = config.get('PORT')
const COIN_DATABASE_URL = config.get('MONGO.coinUrl') as string

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
    new Connection(COIN_DATABASE_URL)
    const webSocketETH = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketETH, 'etheur')
    const webSocketBTC = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketBTC, 'btceur')
    const webSocketLTC = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketLTC, 'ltceur')
    const webSocketBCH = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketBCH, 'bcheur')
    const webSocketXRP = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketXRP, 'xrpeur')
})