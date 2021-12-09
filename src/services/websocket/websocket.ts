import WebSocket from 'ws'
import TradeData from './types'
import { saveCourse } from '../../storage'

const initWebSocketClient = (url: string): WebSocket => {
    return new WebSocket(url, { perMessageDeflate: false })
}

const manageWebSocket = (ws: WebSocket, currency: string) => {
    ws.on('open', function open() {
        console.log(`opened ${currency} connection\n`)
        ws.send(JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": `live_trades_${currency}`
            }
        }))
    })
    let lastPrice = 0
    ws.on('message', function incoming(receivedData) {
        const tradeData: TradeData = JSON.parse(receivedData.toString())
        const { data } = tradeData
        
        if (tradeData.event === 'trade') {
            const currentPrice = data.price
            if (currentPrice !== lastPrice) {
                const currencyName = currency.split('eur')[0].toUpperCase()
                const timeOfTrade = data.timestamp
                console.log(`Detected transaction of ${currencyName} for: \t${currentPrice.toFixed(2)} €`)
                saveCourse(currencyName, currentPrice, timeOfTrade)
                lastPrice = currentPrice
            }
        } else if (tradeData.event === 'bts:request_reconnect') {
            console.log('reconnect_request received: ', receivedData.toString())
            console.log(`re-opened ${currency} connection\n`)
            ws.send(JSON.stringify({
                "event": "bts:subscribe",
                "data": {
                    "channel": `live_trades_${currency}`
                }
            }))
        }
    })
}

export { 
    initWebSocketClient,
    manageWebSocket
}