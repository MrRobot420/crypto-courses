import express from 'express'
import config from 'config'
const bitcoinRouter = express.Router()

import { getBalanceForAddress } from '../../connectors/soChain'

bitcoinRouter.post('/btc-balance', async (req, res): Promise<object> => {
    const { address } = req.body

    if (address) {
        console.log('using provided address...')
        const data = await getBalanceForAddress(address, 'BTC')
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('BITCOIN.ADDRESS')
    const data = await getBalanceForAddress(fallbackAddress, 'BTC')
    return res.status(200).send(data)
})

export default bitcoinRouter