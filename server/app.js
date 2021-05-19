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

const PORT = process.env.PORT || 8080

// const fetch = require('node-fetch')
const axios = require('axios')
const userRouter = require('./routes/user')
const partyRouter = require('./routes/party')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/party', partyRouter)
app.use(express.urlencoded({ extended: false }));

// Schema
const Message = require('./schemas/message')

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
    socket.emit("connection", ["Hello World", "Another Message"]);
    socket.on("send message", body => {
        io.emit("message", body)
    })
    socket.on('setPartyId', partyId => {
        console.log(partyId)
        Message.find({'partyId': partyId}, (error, messages) => {
            if(error) {
                console.log(error)
            } else {
                socket.emit("allMessages", messages)
            }
        })
    })
})

app.post('/chat', (req, res) => {
    const userId = req.body.id
    const partyId = req.body.partyId
    const username = req.body.username
    const body = req.body.body
    const time = req.body.time

    let message = new Message({
        partyId: partyId,
        userId: userId,
        username: username,
        body: body,
        time: time
    })

    message.save((error) => {
        if(error) {
            res.json({error: 'Unable to save!'})
        } else {
            res.json({success: true, message: 'Saved new message'})
        }
    })
})

http.listen(process.env.PORT, () => {
    console.log('Server is running...')
}) 