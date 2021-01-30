import { fetchLatestCryptoListings } from '../connectors';
import { saveData } from '../fileWriter';

export const handleDataRetrieval = async () => {
    const data = await fetchLatestCryptoListings()
    // saveData(data)
    return data
}
