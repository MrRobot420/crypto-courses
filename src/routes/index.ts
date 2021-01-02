import express from 'express'
const routes = express.Router()

import coinCapRouter from './coinCap'
import ethereumRouter from './ethereum'

routes.use(coinCapRouter)
routes.use(ethereumRouter)

export default routes