import { getCourseData, getTransactions, saveTransaction } from '../../storage'
import ICryptoDoc from '../../storage/models/cryptoDoc'
import { ITradeData } from '../../storage/models/tradeData'

const buyCurrency = async (currency: string, amount: number, userId: string, baseCurrency: string) => {
    try {
        const storedData = await getCourseData(currency)
        const totalEntries = storedData!.courses.length - 1
        const { date, price, marketplace } = storedData?.courses[totalEntries]
        const latestCourseData = { date, price, marketplace }
        const sum = parseFloat((amount * price).toFixed(2))
    
        await saveTransaction(userId, { currency, price, amount, sum, date, baseCurrency })

        const confirmationMessage = `${userId} BOUGHT ${amount} ${currency} at a price of ${price}€. - SUM: ${sum}€`
        console.log(confirmationMessage)
        
        const confirmationData = {
            currency,
            amount,
            userId,
            sum,
            baseCurrency,
            latestCourseData,
            message: confirmationMessage
        }
        
        return confirmationData
    } catch (err) {
        console.log(err)
    }
}

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
    return caluclateCurrencyBalance(transactionData, currency, courseData)
}

const caluclateCurrencyBalance = async (transactionData: any, currency: string, courseData: ICryptoDoc) => {
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
    buyCurrency,
    calculateAccountValue,
    calculateCurrencyValue
}