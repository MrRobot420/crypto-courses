import { Document } from 'mongoose'

interface ICryptoDoc extends Document {
    lastUpdated: string,
    currency: string,
    courses: [{
        date: string,
        price: number,
        marketplace: string
    }],
}

export default ICryptoDoc