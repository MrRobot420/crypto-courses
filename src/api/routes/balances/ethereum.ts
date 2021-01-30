import express from 'express'
import config from 'config'
const ethereumRouter = express.Router()

import { getBalanceForAddress } from '../../connectors/etherScan'

ethereumRouter.post('/eth-balance', async (req, res): Promise<object> => {
    const startTime = new Date().getTime() / 1000
    const { address } = req.body

    if (address) {
        const data = await getBalanceForAddress(address)
        const endTime = new Date().getTime() / 1000
        const duration = endTime - startTime
        
        console.log(`POST request on /eth-balance resolved in ${duration.toFixed(2)}s.`)
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('ETHEREUM.ADDRESS')
    const data = await getBalanceForAddress(fallbackAddress)
    return res.status(200).send(data)
})

export default ethereumRouter