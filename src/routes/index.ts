import express from 'express'
const routes = express.Router()

import coinCapRouter from './coinCap'

routes.use(coinCapRouter)

export default routes