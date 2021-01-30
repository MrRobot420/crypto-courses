import { Schema, model } from 'mongoose'

const userAccountSchema = new Schema({
    userId: { type: String },
    currencies: [{
        currency: { type: String },
        amount: { type: Number },
        lastPurchase: { type: String },
        lastSale: { type: String },
    }]
})

const userAccountModel = model('userAccount', userAccountSchema)

export {
    userAccountModel
} 