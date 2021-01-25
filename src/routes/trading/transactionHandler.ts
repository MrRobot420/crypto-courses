import { getCourseData, getTransactions, saveTransaction } from '../../storage'
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

export {
    buyCurrency,
    calculateAccountValue
}