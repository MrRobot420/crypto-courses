import { cryptoModel, userTradeModel, userAccountModel } from './index'
import ICryptoDoc from './models/cryptoDoc'
import { ITradeData } from './models/tradeData'
import { calculateCurrencyValue } from '../api/services'

const getCourseData = async (currency: string): Promise<ICryptoDoc> => {
    try {
        const response = await cryptoModel.findOne({ currency })
        return response
    } catch (err) {
        console.log(err)
    }
    return await cryptoModel.find({ currency })
}

const saveCourse = async (currency: string, price: number, time: string) => {
    const course = { price, date: time, marketplace: 'bitstamp' }
    const response = await cryptoModel.find({ currency })
    
    if (response) {
        const currentData: ICryptoDoc = response[0]
        const previousCourses = currentData.courses
        previousCourses.push(course)
        const updateResponse = await cryptoModel.findOneAndUpdate({ currency }, { courses: previousCourses }, { useFindAndModify: false })
        if (updateResponse !== null) console.log(`Updated ${currency} course data.\n`)
    } else {
        await cryptoModel.create({currency, courses: [ course ]})
    }
}

const saveTransaction = async (userId: string, tradeData: ITradeData) => {
    try {
        const response = await userTradeModel.find({ userId })
        if (response) {
            const currentData = response[0]
            const previousPurchases = currentData.transactions
            previousPurchases.push(tradeData)
            const updateResponse = await userTradeModel.findOneAndUpdate({ userId }, { transactions: previousPurchases }, { useFindAndModify: false })
            if (updateResponse !== null) console.log(`\nUpdated ${userId}'s transactions.`)
            await addBoughtCurrencyToAccountBalance(userId, tradeData)
        } else {
            await userTradeModel.create({ userId, transactions: [ tradeData ]})
        }
    } catch (err) {
        console.log(err)
    }
}

const getTransactions = async (userId: string) => {
    try {
        const response = await userTradeModel.find({ userId })
        if (response.length >= 1) {
            const transactionData = response[0]
            return transactionData
        }
        return { message: 'ERROR. User not found' }
    } catch (err) {
        console.log(err)
        return { message: 'ERROR. Problem while retrieving transaction data.'}
    }
}

const addBoughtCurrencyToAccountBalance = async (userId: string, transactionData: ITradeData) => {
    const { currency } = transactionData
    const summaryForCurrency = await calculateCurrencyValue(userId, currency)
    const amount: number = summaryForCurrency.summary.amount
    const updatedData = {
        currency,
        amount,
        lastPurchase: parseInt((new Date().getTime() / 1000).toString()).toString(),
    }
    try {
        const response = await userAccountModel.find({ userId })
        if (response.length > 0) {
            const currentData = response[0]
            const currentCurrencyData = currentData.currencies.filter((cur: any) => cur.currency !== currency)
            currentCurrencyData.push(updatedData)

            const updateResponse = await userAccountModel.findOneAndUpdate({ userId }, { currencies: currentCurrencyData }, { useFindAndModify: false })
            if (updateResponse !== null) console.log(`\nUpdated ${userId}'s account balance.`)
        } else {
            await userAccountModel.create({ userId, currencies: [ updatedData ]})
        }
    } catch (err) {
        console.log(err)
    }
}

export {
    getCourseData,
    saveCourse,
    saveTransaction,
    getTransactions,
    addBoughtCurrencyToAccountBalance
}