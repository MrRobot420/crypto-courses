import { fetchLatestCryptoListings } from '../services/apiConnector';
import { saveData } from '../services/fileWriter';

export const handleDataRetrieval = async () => {
    const data = await fetchLatestCryptoListings()
    saveData(data)
}
