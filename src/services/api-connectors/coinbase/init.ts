import { Client } from 'coinbase'
import config from 'config'

const initClient = async (): Promise<Client> => {
    return new Client({ apiKey: config.get('COINBASE.API_KEY'), apiSecret: config.get('COINBASE.API_SECRET'), strictSSL: false })
}

export default initClient