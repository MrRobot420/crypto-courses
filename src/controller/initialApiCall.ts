import { fetchLatestCryptoListings } from '../services/api-connectors';
import { saveData } from '../services/fileWriter';

export const handleDataRetrieval = async () => {
    const data = await fetchLatestCryptoListings()
    saveData(data)
}
