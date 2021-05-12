// API KEY: AA3FAF927A5D3C878127978E156DBE73

const express = require('express')
const app = express() 
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')

// Schema
const Party = require('./schemas/party')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)


mongoose.connect('mongodb+srv://wezrine:alexander@cluster0.nxus8.mongodb.net/PartyUp?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})

app.get('/party/:appId', (req, res) => {
    let appId = req.params.appId

    Party.find({'appId': appId}, (error, parties) => {
        if(error) {
            res.json({error: 'Unable to get parties'})
        } else {
            res.json(parties)
        }
    })
})

app.post('/party', (req, res) => {
    const appId = req.body.appId
    const partyName = req.body.partyName
    const gameTitle = req.body.gameTitle
    const description = req.body.description

    let party = new Party({
        appId: appId,
        partyName: partyName,
        gameTitle: gameTitle,
        description: description
    })

    party.save((error) => {
        if(error) {
            res.json({error: 'Unable to save!'})
        } else {
            res.json({success: true, message: 'Saved new post'})
        }
    })
})

app.listen(8080, () => {
    console.log('Server is running...')
})