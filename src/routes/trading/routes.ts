import express from 'express'
const tradingRouter = express.Router()

import { getCourseData, saveTransaction } from '../../storage/operations'

tradingRouter.post('/buy', async (req, res): Promise<object> => {
    const { currency, amount, userId } = req.body

    if (currency && userId && amount) {
        try {
            const data = await getCourseData(currency)
            const totalEntries = data!.courses.length - 1
            const { date, price, marketplace } = data?.courses[totalEntries]
            const latestCourseData = { date, price, marketplace }
            const sum = (amount * price).toFixed(2)
            const confirmationMessage = `${userId} BOUGHT ${amount} ${currency} at a price of ${price}€. - SUM: ${sum}€`
            console.log(confirmationMessage)
            
            const confirmationData = {
                currency,
                amount,
                userId,
                sum,
                latestCourseData,
                message: confirmationMessage
            }
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to buy ${currency}.` })        
        }
    }
    return res.status(404).send({ error: `ERROR. Need to provide currency, amount and userId. Retrieved: ${currency}, ${userId}` })
})

export default tradingRouter