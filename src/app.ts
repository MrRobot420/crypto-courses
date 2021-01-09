import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import routes from './routes'
import { initWebSocketClient, manageWebSocket } from './websocket'


const app = express()
app.use(bodyParser.json())

app.use('/api', routes)


const PORT = config.get('PORT')

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
    const webSocket = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(webSocket, 'etheur')
    // manageWebSocket(webSocket, 'btceur')
    // manageWebSocket(webSocket, 'ltceur')
})