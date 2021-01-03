import express from 'express'
const routes = express.Router()

import coinCapRouter from './coinCap'
import ethereumRouter from './ethereum'
import bitcoinRouter from './bitcoin'
import litecoinRouter from './litecoin'

routes.use(coinCapRouter)
routes.use(ethereumRouter)
routes.use(bitcoinRouter)
routes.use(litecoinRouter)

export default routes