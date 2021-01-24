import { cryptoModel } from './index'
import ICryptoDoc from './models/cryptoDoc'

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
    const currentData: ICryptoDoc = (await cryptoModel.find({ currency }))[0]

    if (currentData) {
        const previousCourses = currentData.courses
        previousCourses.push(course)
        const response = await cryptoModel.findOneAndUpdate({ currency }, { courses: previousCourses }, { useFindAndModify: false })
        if (response !== null) console.log(`Updated ${currency} course data.\n`);
    } else {
        await cryptoModel.create({currency, courses: [course]})
    }
}

const saveTransaction = async (currency: string, price: number, amount: number, userId: string, time: string) => {
    
}

export {
    getCourseData,
    saveCourse,
    saveTransaction
}