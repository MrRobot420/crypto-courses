import { cryptoModel, userTradeModel } from './index'
import ICryptoDoc from './models/cryptoDoc'
import { ITradeData } from './models/tradeData'

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
            const updateResponse = await userTradeModel.findOneAndUpdate({ userId }, { transactions: previousPurchases })
            if (updateResponse !== null) console.log(`Updated ${userId}'s transactions.\n`);
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
        if (response) {
            const transactionData = response[0]
            return transactionData
        }
        return { message: 'ERROR. User not found'}
    } catch (err) {
        console.log(err)
        return { message: 'ERROR. Problem while retrieving transaction data.'}
    }
}

export {
    getCourseData,
    saveCourse,
    saveTransaction,
    getTransactions
}