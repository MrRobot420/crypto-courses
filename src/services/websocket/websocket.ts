import WebSocket from 'ws'
import TradeData from './types'

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
                console.log(`${currency.split('eur')[0].toUpperCase()} Price: \t${currentPrice.toFixed(2)} €`)
                lastPrice = currentPrice
            }
        }
    })
}

export { 
    initWebSocketClient,
    manageWebSocket
}