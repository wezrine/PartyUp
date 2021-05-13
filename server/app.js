// API KEY: AA3FAF927A5D3C878127978E156DBE73

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// const fetch = require('node-fetch')
const axios = require('axios')
const rawgApiKey = process.env.RAWG_API_KEY
const userRouter = require('./routes/user')

// Schema
const User = require('./schemas/user')
const Party = require('./schemas/party')
const Member = require('./schemas/member')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)


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

    console.log(party)

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


// // Autocomplete api call
// const options = {
//     method: 'GET',
//     url: 'https://api.rawg.io/api/games?tags=multiplayer',
//     qs: {
//         key: rawgApiKey,
//         search: undefined
//     }
// };

// const apiCall = async (url, options) => {
//     await axios(url, options)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
//             }
//             return res.json();
//         })
//         .then(json => console.log(json.results[1]))
//         .catch(err => console.log(err))
// }

// apiCall(options)

// app.get('/api/gameAutocomplete', async (req, res) => {
//     const query = req.query.q;
//     gameAutocomplete.qs.search = query;
//     res.set('Cache-Control', 'no-cache');
//     res.json(await apiCall(gameAutocomplete));
//     console.log(`/api/gameAutocomplete?q=${query} endpoint has been called!`);
// });


app.listen(8080, () => {
    console.log('Server is running...')
})
