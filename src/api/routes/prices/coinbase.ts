import express from 'express'
const coinbaseRouter = express.Router()

import { getBuyPrice } from '../../connectors/coinbase'

coinbaseRouter.post('/currency-price', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { currencyPair } = req.body

    if (currencyPair) {
        const data = await getBuyPrice(currencyPair)
        const endTime = new Date().getTime() / 1000
        const duration = endTime - startTime
        
        console.log(`POST request on /currency-price resolved in ${duration.toFixed(2)}s.`)
        return res.status(200).send(data)
    }
    return res.status(400).send()
})

export default coinbaseRouter