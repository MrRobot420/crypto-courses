import express from 'express'
import config from 'config'
const bitcoinRouter = express.Router()

import { getBalanceForAddress } from '../../connectors/soChain'

bitcoinRouter.post('/btc-balance', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { address } = req.body

    if (address) {
        const data = await getBalanceForAddress(address, 'BTC')
        const endTime = new Date().getTime() / 1000
        const duration = endTime - startTime
        
        console.log(`POST request on /btc-balance resolved in ${duration.toFixed(2)}s.`)
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('BITCOIN.ADDRESS')
    const data = await getBalanceForAddress(fallbackAddress, 'BTC')
    return res.status(200).send(data)
})

export default bitcoinRouter