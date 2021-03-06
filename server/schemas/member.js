const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    userId: String,
    username: String
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member