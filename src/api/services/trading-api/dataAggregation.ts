import { ITradeData } from '../../../storage/models/tradeData'

const assembleAccountInformation = (transactionData: any) => {
    const accountInformation = {
        baseCurrency: '',
        value: 0,
        transactionData: [] as ITradeData[],
    }

    transactionData.transactions.forEach((ta: ITradeData) => {
        accountInformation.value += ta.sum
        accountInformation.baseCurrency = ta.baseCurrency
        accountInformation.transactionData.push(ta)
    })

    return accountInformation
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
    assembleAccountInformation,
    createSummary
}