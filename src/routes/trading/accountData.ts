import { getCourseData, getTransactions } from '../../storage'
import ICryptoDoc from '../../storage/models/cryptoDoc'
import { ITradeData } from '../../storage/models/tradeData'

const calculateAccountValue = async (userId: string) => {
    const transactionData = await getTransactions(userId)
    if (transactionData.message) {
        throw Error(transactionData.message)
    }
    return assembleAccountInformation(transactionData)
}

const assembleAccountInformation = (transactionData: any) => {
    const accountInformation = {
        transactionData: [] as ITradeData[],
        value: 0,
        baseCurrency: ''
    }

    transactionData.transactions.forEach((ta: ITradeData) => {
        accountInformation.transactionData.push(ta)
        accountInformation.value += ta.sum
        accountInformation.baseCurrency = ta.baseCurrency
    })

    return accountInformation
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

const createSummary = (transactionsForCurrency: ITradeData[], currentPrice: number) => {
    let summaryData: any = {}
    summaryData.summary = {
        baseCurrency: transactionsForCurrency[0].baseCurrency,
        cryptoCurrency: transactionsForCurrency[0].currency,
        currentPrice,
        averagePriceThen: 0,
        amount: 0,
        investment: 0,
    }
    
    transactionsForCurrency.forEach(transaction => {
        summaryData.summary.averagePriceThen += transaction.price
        summaryData.summary.amount += transaction.amount
        summaryData.summary.investment += transaction.sum
    })

    summaryData.summary.averagePriceThen = parseFloat((summaryData.summary.averagePriceThen / transactionsForCurrency.length).toFixed(2))

    summaryData.summary.currentValue = parseFloat((currentPrice * summaryData.summary.amount).toFixed(2))
    summaryData.summary.currentChange = parseFloat((summaryData.summary.currentValue - summaryData.summary.investment).toFixed(2))
    summaryData.summary.transactionsForCurrency = transactionsForCurrency

    return summaryData
}

export {
    calculateAccountValue,
    calculateCurrencyValue
}