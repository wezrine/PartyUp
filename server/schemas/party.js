const mongoose = require('mongoose')

const partySchema = new mongoose.Schema({
    appId: String,
    partyName: String,
    gameTitle: String,
    description: String
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party