import config from 'config'
import axios from 'axios'

const BASE_URL = config.get('ETHERSCAN.BASE_URL')
const API_KEY = config.get('ETHERSCAN.API_KEY')

export const getWalletInformation = async (address: string): Promise<object> => {
    const query = `${BASE_URL}?module=account&action=balance&address=${address}&apiKey=${API_KEY}`
    const result = await axios.get(query)
    return result.data
}
