const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.post('/register', (req, res) => {
    const firstName = req.body.firstName
    const username = req.body.username
    const password = req.body.password

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if (!error) {
                let user = new User({
                    firstName: firstName,
                    username: username,
                    password: hash
                })

                user.save().then((registeredUser) => {
                    console.log(registeredUser)
                    res.send('Registered')
                })
            }
        })
    })
})


router.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    User.findOne({
            username: username
    }).then((user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                        console.log(result)
                        const token = jwt.sign({ username: username}, process.env.TOKEN_SECRET_KEY)
                        res.json({success: true, token: token, username: username, firstName: user.firstName, userId: user._id})
                } else {
                    res.send('incorrect username/password')
                }
            })
        }).catch((error) => {
            res.send('incorrect username/password')
        })
})


module.exports = router