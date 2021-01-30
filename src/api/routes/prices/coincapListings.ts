import express from 'express'
const coinCapRouter = express.Router()

import { handleDataRetrieval } from '../../controller/initialApiCall'

coinCapRouter.get('/initial-listings', async (req, res) => {
    const startTime = new Date().getTime() / 1000

    const data = await handleDataRetrieval()
    const endTime = new Date().getTime() / 1000
    const duration = endTime - startTime
        
    console.log(`POST request on /initial-listings resolved in ${duration.toFixed(2)}s.`);
    return res.status(200).send(data)
})

export default coinCapRouter