// API KEY: AA3FAF927A5D3C878127978E156DBE73

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// const fetch = require('node-fetch')
const axios = require('axios')
const userRouter = require('./routes/user')


// Schema
const User = require('./schemas/user')
const Party = require('./schemas/party')
const Member = require('./schemas/member')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://wezrine:alexander@cluster0.nxus8.mongodb.net/PartyUp?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if (!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})

app.get('/party/:game', (req, res) => {
    let game = req.params.game

    Party.find({ 'gameTitle': game }, (error, parties) => {
        if (error) {
            res.json({ error: 'Unable to get parties' })
        } else {
            res.json(parties)
        }
    })
})

app.post('/join/:partyId', (req, res) => {
    const partyId = req.params.partyId
    const userId = req.body.userId

    const member = new Member({
        userId: userId
    })

    Party.findById(partyId, (error, party) => {
        if(error) {
            res.json({error: 'Unable to find job'})
        } else {
            party.members.push(member)
            party.save(error => {
                if(error) {
                    res.json({error: "Unable to save member"})
                } else {
                    res.json({success: true, message: 'Member has been saved!'})
                }
            })
        }
    })
})

// function addMember (userId) {

//     const member = new Member({
//         userId: userId
//     })

//     Party.findById(partyId, (error, party) => {
//         if(error) {
//             res.json({error: 'Unable to find party'})
//         } else {
//             party.members.push(member)
//             party.save(error=> {
//                 if(error) {
//                     res.json({error: "Unable to save member"})
//                 } else {
//                     res.json({success: true, message: "Member has been added!"})
//                 }
//             })
//         }
//     })

// }

app.post('/party', (req, res) => {
    const userId = req.body.userId
    const partyName = req.body.partyName
    const gameTitle = req.body.gameTitle
    const description = req.body.description
    const background = req.body.background

    let party = new Party({
        partyName: partyName,
        gameTitle: gameTitle,
        description: description,
        background: background,
        members: []
    })

    const member = new Member({
        userId: userId
    })

    party.members.push(member)

    party.save((error) => {
        if (error) {
            // console.log(error)
            res.json({ error: 'Unable to save!'})
        } else {
            res.json({ success: true, message: 'Saved new post' })
        }
    })
})

app.get('/my-parties/:userId', (req, res) => {
    const userId = req.params.userId

    Party.find({"members.userId": userId}, (error, parties) => {
        if (error) {
            res.json({ error: 'Unable to get parties' })
        } else {
            res.json(parties)
        }
    })
})




app.get('/api/search', async(req, res) => {
    const searchURL = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&tags=multiplayer&search=${req.query.search}`
    try {
        const {data} = await axios.get(searchURL)
        res.json(data)
        
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, () => {
    console.log('Server is running...')
})
