// API KEY: AA3FAF927A5D3C878127978E156DBE73

const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
const mongoose = require('mongoose')

// const fetch = require('node-fetch')
const axios = require('axios')
const userRouter = require('./routes/user')
const partyRouter = require('./routes/party')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/party', partyRouter)
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

app.get('/api/search', async(req, res) => {
    const searchURL = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&tags=multiplayer&search=${req.query.search}`
    try {
        const {data} = await axios.get(searchURL)
        res.json(data)
        
    } catch (error) {
        console.log(error)
    }
})

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})


http.listen(8080, () => {
    console.log('Server is running...')
})
