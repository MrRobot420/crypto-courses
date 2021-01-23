import { Schema, model } from 'mongoose'

const bitcoinSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String, default: 'BTC' },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const bitcoinModel = model('bitcoin', bitcoinSchema)

export {
    bitcoinModel
} 