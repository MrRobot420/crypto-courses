import express from 'express'
const tradingRouter = express.Router()

import { buyCurrency, calculateAccountValue } from './transactionHandler'

tradingRouter.post('/buy', async (req, res): Promise<object> => {
    const { currency, amount, userId, baseCurrency } = req.body

    if (currency && userId && amount && baseCurrency) {
        try {
            const confirmationData = await buyCurrency(currency, amount, userId, baseCurrency)
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to buy ${currency}.` })        
        }
    }
    return res.status(404).send({ error: `ERROR. Need to provide currency, amount, userId and baseCurrency.` })
})

tradingRouter.post('/account-balance', async (req, res): Promise<object> => {
    const { userId } = req.body

    if (userId) {
        try {
            const confirmationData = await calculateAccountValue(userId)
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to calculate account value for ${userId}.` })        
        }
    }
    return res.status(404).send({ error: `ERROR. Need to provide userId.` })
})

export default tradingRouter