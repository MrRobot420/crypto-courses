import { getCourseData, saveTransaction } from '../../storage/operations'

const buyCurrency = async (currency: string, amount: number, userId: string) => {
    try {
        const storedData = await getCourseData(currency)
        const totalEntries = storedData!.courses.length - 1
        const { date, price, marketplace } = storedData?.courses[totalEntries]
        const latestCourseData = { date, price, marketplace }
        const sum = (amount * price).toFixed(2)
    
        const confirmationMessage = `${userId} BOUGHT ${amount} ${currency} at a price of ${price}€. - SUM: ${sum}€`
        console.log(confirmationMessage)
        
        const confirmationData = {
            currency,
            amount,
            userId,
            sum,
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