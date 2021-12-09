import express from 'express'
import config from 'config'
import { initWebSocketClient, manageWebSocket } from './services/websocket'
import { Connection } from './storage'


const app = express()

const PORT = config.get('PORT')
const COIN_DATABASE_URL = config.get('MONGO.localUrl') as string

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
    const webSocketALGO = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketALGO, 'algoeur')
    const webSocketLINK = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketLINK, 'linkeur')
    const webSocketUSDT = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketUSDT, 'usdteur')
    const webSocketUNI = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketUNI, 'unieur')
    const webSocketXLM = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketXLM, 'xlmeur')
    const webSocketMKR = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketMKR, 'mkreur')
    const webSocketMATIC = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketMATIC, 'maticeur')
    const webSocketSHIB = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketSHIB, 'shibeur')
    const webSocketADA = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketADA, 'adaeur')
    const webSocketAXS = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketAXS, 'axseur')
    const webSocketSAND = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketSAND, 'sandeur')
    const webSocketAAVE = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketAAVE, 'aaveeur')
    const webSocketOMG = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketOMG, 'omgeur')
    const webSocketSUSHI = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketSUSHI, 'sushieur')

})