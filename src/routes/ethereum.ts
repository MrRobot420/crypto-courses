import express from 'express'
import config from 'config'
const ethereumRouter = express.Router()

import { getBalanceForAddress } from '../services/apiConnector/etherScan'


ethereumRouter.post('/eth-balance', async (req, res): Promise<object> => {
    const { address } = req.body

    if (address) {
        console.log('using provided address...')
        const data = await getBalanceForAddress(address)
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('ETHEREUM.ADDRESS')
    const data = await getBalanceForAddress(fallbackAddress)
    return res.status(200).send(data)
})

export default ethereumRouter