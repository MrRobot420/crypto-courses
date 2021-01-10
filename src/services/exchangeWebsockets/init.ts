import ccxws from 'ccxws'

const initBinance = () => {
    return new ccxws.Binance()
}

const handleWebsocket = (websocket: any) => {
    websocket.on('trade', (trade: object) => {
        console.log(trade)
    })
}

export { 
    initBinance,
    handleWebsocket
}