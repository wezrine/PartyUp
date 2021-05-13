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
const Party = require('./schemas/party')

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
        if (error) {
            res.json({ error: 'Unable to save!' })
        } else {
            res.json({ success: true, message: 'Saved new post' })
        }
    })
})


// Autocomplete api call
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

// async function getRawgApi(gameName) {
//     if (gameName !== '') {
//         try {
//             const response = await fetch(`https://api.rawg.io/api/games?key=00b7a7b22bfb4713982e46a6c4c79bf3&tags=multiplayer&search=${gameName.toLowerCase()}`);
//             const json = await response.json();
//         } catch (err) {
//             console.error(err);
//         }
//     }
// }

// app.get('/api/gameAutocomplete', async (req, res) => {
//     const query = req.query.q;
//     gameAutocomplete.qs.search = query;
//     res.set('Cache-Control', 'no-cache');
//     res.json(await apiCall(gameAutocomplete));
//     console.log(`/api/gameAutocomplete?q=${query} endpoint has been called!`);
// });

app.get('/api/search', async(req, res) => {
    // const gameName = req.body.gameName
    // console.log(gameName)
    const searchURL = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&tags=multiplayer&search=${req.query.search}`
    try {
        const {data} = await axios.get(searchURL)
        res.json(data)
        
    } catch (error) {
        console.log(error)
    }


    // fetch(`https://api.rawg.io/api/games?key=00b7a7b22bfb4713982e46a6c4c79bf3&tags=multiplayer&search=${gameName.toLowerCase()}`)
    // .then(response => response.json())
    // .then(json => {
    //     console.log(json.results)
    // })
// const apiCall = async (url) => {
//     try {
//         const response = await axios.get(url)
//         console.log(response)
//         const json = await response.json()
//         res.json(json.results)
//     } catch (error) {
//         console.log(error)
//     }
//     // const response = await axios(url)
//     //     .then(res => {
//     //         if (!res.ok) {
//     //             throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
//     //         }
//     //         return res.json();
//     //     })
//     //     .then(json => console.log(json.results[1]))
//     //     .catch(err => console.log(err))
// }
// apiCall(searchURL)
})

app.listen(8080, () => {
    console.log('Server is running...')
})
