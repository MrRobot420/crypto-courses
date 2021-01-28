import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import routes from '../routes'
import { Connection } from '../storage'


const app = express()
app.use(bodyParser.json())

app.use('/api', routes)


const PORT = config.get('API_PORT')
const COIN_DATABASE_URL = config.get('MONGO.coinUrl') as string

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
    new Connection(COIN_DATABASE_URL)
})