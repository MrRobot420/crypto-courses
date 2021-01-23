import { Schema, model } from 'mongoose'

const ethereumSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String, default: 'ETH' },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const ethereumModel = model('ethereum', ethereumSchema)

export {
    ethereumModel
} 