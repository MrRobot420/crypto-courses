import { cryptoModel } from './index'
import ICryptoDoc from './models/cryptoDoc'


const saveCourse = async (currency: string, price: number, time: string) => {
    const course = { price, date: time, marketplace: 'bitstamp' }
    const currentData: ICryptoDoc = (await cryptoModel.find({ currency }))[0]

    if (currentData) {
        const previousCourses = currentData.courses
        previousCourses.push(course)
        const response = await cryptoModel.findOneAndUpdate({ currency }, { courses: previousCourses }, { useFindAndModify: false })
        if (response !== null) console.log(`Updated ${currency} course data.`);
    } else {
        await cryptoModel.create({currency, courses: [course]})
    }
}

export {
    saveCourse
}