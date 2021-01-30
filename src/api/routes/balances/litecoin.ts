import express from 'express'
import config from 'config'
const litecoinRouter = express.Router()

import { getBalanceForAddress } from '../../connectors/soChain'


litecoinRouter.post('/ltc-balance', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { address } = req.body

    if (address) {
        console.log('using provided address...')
        const data = await getBalanceForAddress(address, 'LTC')
        const endTime = new Date().getTime() / 1000
        const duration = endTime - startTime
        
        console.log(`POST request on /ltc-balance resolved in ${duration.toFixed(2)}s.`)
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('LITECOIN.ADDRESS')
    const data = await getBalanceForAddress(fallbackAddress, 'LTC')
    return res.status(200).send(data)
})

export default litecoinRouter