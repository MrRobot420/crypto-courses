import { Schema, model } from 'mongoose'

const rippleSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String, default: 'XRP' },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const rippleModel = model('ripple', rippleSchema)

export {
    rippleModel
}