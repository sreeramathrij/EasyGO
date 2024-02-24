const { Int32, Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    wallet: {type: Decimal128, default: 0,required: true}
    },
    { collection: 'user-data' })

const model = mongoose.model('UserData', User)

module.exports = model