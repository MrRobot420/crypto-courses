import axios from 'axios'
import config from 'config'
import { saveData } from "../fileWriter";

// Use this in order to get data once (and dont use up the request limit!) --> Saved in data/data.json
export const fetchLatestCryptoListings = async () => {
    const apiKey: string = config.get('API_KEY')
    const url: string = `${config.get('COIN_CAP_BASE_URL')}/cryptocurrency/listings/latest`
    const params: string = '?start=1&limit=5000&convert=EUR'
    

    try {
        const result = await axios.get(url + params, { headers: { 'X-CMC_PRO_API_KEY': apiKey }})
        return result.data
    } catch (err) {
        console.log(err)
    }
}