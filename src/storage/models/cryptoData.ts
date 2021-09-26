import { Schema, model } from 'mongoose'
import { ICryptoDoc } from '../../types'

const cryptoSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const cryptoModel = model<ICryptoDoc>('cryptoData', cryptoSchema)

export {
    cryptoModel
} 