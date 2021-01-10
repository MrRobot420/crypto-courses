import initClient from './init'

const getBuyPrice = (currencyPair: string): object => {
    const client = initClient()
    let data = {}
    client.getBuyPrice({ 'currencyPair': currencyPair }, (err, obj) => {
        console.log(`total amount to buy 1 ${currencyPair}: ${obj.data.amount}`)
        data = obj.data
    })
    return data
} 

export {
    getBuyPrice
}