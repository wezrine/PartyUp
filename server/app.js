// API KEY: AA3FAF927A5D3C878127978E156DBE73

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const fetch = require('node-fetch')
const axios = require('axios')
const rawgApiKey = process.env.RAWG_API_KEY

// Schema
const Party = require('./schemas/party')

app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://wezrine:alexander@cluster0.nxus8.mongodb.net/PartyUp?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if (!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})

app.get('/party/:appId', (req, res) => {
    let appId = req.params.appId

    Party.find({ 'appId': appId }, (error, parties) => {
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
const options = {
    method: 'GET',
    url: 'https://api.rawg.io/api/games?tags=multiplayer',
    qs: {
        key: rawgApiKey,
        search: undefined
    }
};

const apiCall = async (url, options) => {
    await axios(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
            }
            return res.json();
        })
        .then(json => console.log(json.results[1]))
        .catch(err => console.log(err))
}

apiCall(options)

app.get('/api/gameAutocomplete', async (req, res) => {
    const query = req.query.q;
    gameAutocomplete.qs.search = query;
    res.set('Cache-Control', 'no-cache');
    res.json(await apiCall(gameAutocomplete));
    console.log(`/api/gameAutocomplete?q=${query} endpoint has been called!`);
});


app.listen(8080, () => {
    console.log('Server is running...')
})
