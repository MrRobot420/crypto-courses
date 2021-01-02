import express from 'express'
import config from 'config'
const ethereumRouter = express.Router()

import { getWalletInformation } from '../services/apiConnector/ethereum'


ethereumRouter.get('/test-eth', async (req, res): Promise<object> => {
    const { address } = req.body

    if (address) {
        console.log('using provided address...');
        
        const data = await getWalletInformation(address)
        return res.status(200).send(data)
    }
    const fallbackAddress: string = config.get('ETHEREUM.ADDRESS')
    const data = await getWalletInformation(fallbackAddress)
    return res.status(200).send(data)
})

export default ethereumRouter