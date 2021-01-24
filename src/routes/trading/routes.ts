import express from 'express'
const tradingRouter = express.Router()
import ICryptoDoc from '../../storage/models/cryptoDoc'

import { getCourseData } from '../../storage/operations'

tradingRouter.post('/buy', async (req, res): Promise<object> => {
    const { currency } = req.body

    if (currency) {
        try {
            const data = await getCourseData(currency)
            const totalEntries = data!.courses.length - 1
            const { date, price, marketplace } = data?.courses[totalEntries]
            const latestCourseData = { date, price, marketplace }
            const confirmationMessage = `TRADE: BOUGHT ${currency} for a price of ${price}€ ...`
            console.log(confirmationMessage)
            
            const confirmationData = {
                latestCourseData,
                message: confirmationMessage
            }
            return res.status(200).send(confirmationData)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ error: `ERROR while trying to buy ${currency}.` })        
        }
    }
    return res.status(404).send({ error: `Please provide a currency. Retrieved: ${currency}` })
})

export default tradingRouter