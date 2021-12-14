import { cryptoModel } from './index'
import { ICryptoDoc } from '../types'

const getCourseData = async (currency: string): Promise<ICryptoDoc> => {
    try {
        const response = await cryptoModel.findOne({ currency })
        return response!
    } catch (err) {
        console.log('Error while trying to get mongoDB course data: ', err)
        return {} as ICryptoDoc
    }
}

const saveCourse = async (currency: string, price: number, time: string) => {
    const course = { price, date: time, marketplace: 'bitstamp' }
    try {
        const response = await cryptoModel.find({ currency })
        
        if (response.length !== 0) {
            const currentData: ICryptoDoc = response[0]
            const previousCourses = currentData.courses
            previousCourses.push(course)
            const updateResponse = await cryptoModel.findOneAndUpdate({ currency }, { courses: previousCourses }, { useFindAndModify: false })
            if (updateResponse !== null) console.log(`Updated ${currency} course data.\n`)
        } else {
            console.warn(`No course data found for currency: ${currency} - creating it...`)
            await cryptoModel.create({currency, courses: [ course ]})
        }
    } catch(err) {
        console.log('Error while trying to save mongoDB course data: ', err)
    }
}

export {
    getCourseData,
    saveCourse
}