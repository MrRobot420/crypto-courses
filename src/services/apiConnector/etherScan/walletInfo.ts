import config from 'config'
import axios from 'axios'

import { formatEtherResponse } from '../../utils'

const BASE_URL = config.get('ETHERSCAN.BASE_URL')
const API_KEY = config.get('ETHERSCAN.API_KEY')

type balanceObject = {
    status: number,
    message: string,
    result: string
}

export const getBalanceForAddress = async (address: string): Promise<balanceObject> => {
    const query = `${BASE_URL}?module=account&action=balance&address=${address}&apiKey=${API_KEY}`
    const result = await axios.get(query)
    result.data.result = formatEtherResponse(result.data.result)
    return result.data
}
