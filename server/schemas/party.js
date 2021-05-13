const mongoose = require('mongoose')
const Member = require('./member')

const partySchema = new mongoose.Schema({
    appId: String,
    partyName: String,
    gameTitle: String,
    description: String,
    background: String,
    members: [Member.schema]
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party