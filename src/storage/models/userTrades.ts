import { Schema, model } from 'mongoose'

const userTradeSchema = new Schema({
    userId: { type: String },
    transactions: [{
        currency: { type: String },
        baseCurrency: { type: String },
        amount: { type: Number },
        price: { type: Number },
        sum: { type: Number },
        date: { type: String },
        marketplace: { type: String }
    }]
})

const userTradeModel = model('userTrades', userTradeSchema)

export {
    userTradeModel
} 