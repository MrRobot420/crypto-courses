import express from 'express'
const tradingRouter = express.Router()

import { buyCurrency } from '../../services/trading-api/transactionHandler'
import { calculateAccountValue, calculateCurrencyValue } from '../../services/trading-api/accountData';

tradingRouter.post('/buy', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { currency, amount, userId, baseCurrency } = req.body

    if (currency && userId && amount && baseCurrency) {
        try {
            const confirmationData = await buyCurrency(currency, amount, userId, baseCurrency)
            const endTime = new Date().getTime() / 1000
            const duration = endTime - startTime

            console.log(`POST request on /buy resolved in ${duration.toFixed(2)}s.`);
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to buy ${currency}.` })        
        }
    }
    return res.status(404).send({ error: `ERROR. Need to provide currency, amount, userId and baseCurrency.` })
})

tradingRouter.post('/account-balance', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { userId } = req.body

    if (userId) {
        try {
            const confirmationData = await calculateAccountValue(userId)
            const endTime = new Date().getTime() / 1000
            const duration = endTime - startTime

            console.log(`POST request on /account-balance resolved in ${duration.toFixed(2)}s.`)
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to calculate account value for ${userId}.` })        
        }
    }
    return res.status(404).send({ error: `ERROR. Need to provide userId.` })
})

tradingRouter.post('/currency-balance', async (req, res) => {
    const startTime = new Date().getTime() / 1000
    const { userId, currency } = req.body

    if (userId && currency) {
        try {
            const currencyData = await calculateCurrencyValue(userId, currency)
            const endTime = new Date().getTime() / 1000
            const duration = endTime - startTime
            
            console.log(`POST request on /currency-balance resolved in ${duration.toFixed(2)}s.`)
            return res.status(200).send(currencyData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `Error while trying to get currency balance of ${currency} from ${userId}.`})
        }
    }
    return res.status(404).send({ error: `ERROR: Need to provide userId and currency.`})
})

export default tradingRouter