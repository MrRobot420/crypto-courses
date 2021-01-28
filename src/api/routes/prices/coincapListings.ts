import express from 'express'
const coinCapRouter = express.Router()

import { handleDataRetrieval } from '../../controller/initialApiCall'

coinCapRouter.get('/initial-listings', async (req, res) => {
    await handleDataRetrieval()
    return res.status(200).send()
})

export default coinCapRouter