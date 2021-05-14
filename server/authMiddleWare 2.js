const jwt = require('jsonwebtoken')
const User = require('./schemas/user');
require('dotenv').config()

function authenticate(req, res, next) {
    
    let headers = req.headers['authorization']
    if(headers) {
        const token = headers.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if(decoded) {
            const username = decoded.username 
            const authUser = User.find(user => user.username == username)
            if(authUser) {
                next() // perform the original request 
            } else {
                res.json({error: 'Unable to authenticate'})
            }
        } else {
            res.json({error: 'Unable to authenticate'})
        }
    } else {
        res.json({error: 'Required headers are missing...'})
    }  
}

module.exports = authenticate