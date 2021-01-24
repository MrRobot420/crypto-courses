import express from 'express'
const routes = express.Router()

import coinCapRouter from './coinCap'
import coinbaseRouter from './coinbase'
import ethereumRouter from './ethereum'
import bitcoinRouter from './bitcoin'
import litecoinRouter from './litecoin'

import tradingRouter from './trading'

routes.use(coinCapRouter)
routes.use(coinbaseRouter)
routes.use(ethereumRouter)
routes.use(bitcoinRouter)
routes.use(litecoinRouter)

routes.use(tradingRouter)

export default routes