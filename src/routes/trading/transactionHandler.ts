import { getCourseData, saveTransaction } from '../../storage/operations'

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

export {
    buyCurrency
}