const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    partyId: String,
    userId: String,
    body: String,
    time: String,
    username: String
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message