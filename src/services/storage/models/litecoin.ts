import { Schema, model } from 'mongoose'

const litecoinSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String, default: 'LTC' },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const litecoinModel = model('litecoin', litecoinSchema)

export {
    litecoinModel
} 