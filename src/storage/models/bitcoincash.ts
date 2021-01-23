import { Schema, model } from 'mongoose'

const bitcoincashSchema = new Schema({
    lastUpdated: { type: String },
    currency: { type: String, default: 'BCH' },
    courses: [{
        date: { type: String },
        price: { type: Number },
        marketplace: { type: String }
    }]
})

const bitcoincashModel = model('bitcoincash', bitcoincashSchema)

export {
    bitcoincashModel
} 