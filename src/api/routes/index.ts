import express from 'express'
const routes = express.Router()

import coinCapRouter from './prices/coincapListings'
import coinbaseRouter from './prices/coinbase'
import ethereumRouter from './balances/ethereum'
import bitcoinRouter from './balances/bitcoin'
import litecoinRouter from './balances/litecoin'

import tradingRouter from './trading'

routes.use(coinCapRouter)
routes.use(coinbaseRouter)
routes.use(ethereumRouter)
routes.use(bitcoinRouter)
routes.use(litecoinRouter)

routes.use(tradingRouter)

export default routes