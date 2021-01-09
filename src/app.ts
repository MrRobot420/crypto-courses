import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import routes from './routes'
import { initWebSocketClient, manageWebSocket } from './services/websocket'


const app = express()
app.use(bodyParser.json())

app.use('/api', routes)


const PORT = config.get('PORT')

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
    const webSocketETH = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketETH, 'etheur')
    const webSocketBTC = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketBTC, 'btceur')
    const webSocketLTC = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocketLTC, 'ltceur')
})