import { getCourseData, getTransactions } from '../../../storage'
import ICryptoDoc from '../../../storage/models/cryptoDoc'
import { ITradeData } from '../../../storage/models/tradeData'
import { assembleAccountInformation, createSummary } from './dataAggregation';

const calculateAccountValue = async (userId: string) => {
    const transactionData = await getTransactions(userId)
    if (transactionData.message) {
        throw Error(transactionData.message)
    }
    return assembleAccountInformation(transactionData)
}

const calculateCurrencyValue = async (userId: string, currency: string) => {
    const transactionData = await getTransactions(userId)
    const courseData: ICryptoDoc = await getCourseData(currency)

    if (transactionData.message) {
        throw Error(transactionData.message)
    }

    const transactionsForCurrency: ITradeData[] = transactionData.transactions.filter((ta: ITradeData) => ta.currency === currency)
    const currentPrice = courseData.courses[courseData.courses.length - 1].price

    return createSummary(transactionsForCurrency, currentPrice)
}

export {
    calculateAccountValue,
    calculateCurrencyValue
}