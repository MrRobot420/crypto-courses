import config from 'config'
import { initWebSocketClient, manageWebSocket } from './services/websocket'
import { Connection } from './storage'

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

new Connection(COIN_DATABASE_URL)

coins.forEach(coin => {
    const ws = initWebSocketClient('wss://ws.bitstamp.net/')
    manageWebSocket(ws, `${coin}eur`)
})