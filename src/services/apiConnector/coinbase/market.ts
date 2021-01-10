import initClient from './init'

const getBuyPrice = async (currencyPair: string) => {
    const client = await initClient()
    await client.getBuyPrice({ 'currencyPair': currencyPair }, (err, obj) => {
        if (!err) {
            console.log(`total amount to buy 1 ${currencyPair}: ${obj.data.amount}`)
        } else {
            console.log('ERROR! ', err.message)
        }
    })
} 

export {
    getBuyPrice
}