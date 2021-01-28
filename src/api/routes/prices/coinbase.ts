import express from 'express'
const coinbaseRouter = express.Router()

import { getBuyPrice } from '../../connectors/coinbase'

coinbaseRouter.post('/currency-price', async (req, res): Promise<object> => {
    const { currencyPair } = req.body

    if (currencyPair) {
        console.log(`using provided currencyPair: ${currencyPair}...`)
        const data = await getBuyPrice(currencyPair)
        return res.status(200).send(data)
    }
    return res.status(400).send()
})

export default coinbaseRouter