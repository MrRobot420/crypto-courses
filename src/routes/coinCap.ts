import express from 'express'
const coinCapRouter = express.Router()

import { handleDataRetrieval } from '../controller/initialApiCall'

coinCapRouter.get('/initial-listings', async () => {
    await handleDataRetrieval()
})

export default coinCapRouter