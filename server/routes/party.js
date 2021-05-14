const express = require('express');
const router = express.Router();

// Schema
const Party = require('../schemas/party')
const Member = require('../schemas/member')

router.post('/', (req, res) => {
    const userId = req.body.userId
    const partyName = req.body.partyName
    const gameTitle = req.body.gameTitle
    const description = req.body.description
    const background = req.body.background
    const maxMembers = req.body.maxMembers

    let party = new Party({
        partyName: partyName,
        gameTitle: gameTitle,
        description: description,
        background: background,
        maxMembers: maxMembers,
        members: []
    })

    const member = new Member({
        userId: userId
    })

    party.members.push(member)

    party.save((error) => {
        if (error) {
            res.json({ error: 'Unable to save!'})
        } else {
            res.json({ success: true, message: 'Saved new post' })
        }
    })
})

router.put('/', (req, res) => {
    const updatedParty = req.body.updatedParty
    
    Party.findByIdAndUpdate(updatedParty._id, updatedParty, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update'})
        } else {
            res.json({success: true})
        }
    })
})

router.get('/:game', (req, res) => {
    let game = req.params.game

    Party.find({ 'gameTitle': game }, (error, parties) => {
        if (error) {
            res.json({ error: 'Unable to get parties' })
        } else {
            res.json(parties)
        }
    })
})

router.post('/join/:partyId', (req, res) => {
    const partyId = req.params.partyId
    const userId = req.body.userId

    const member = new Member({
        userId: userId
    })

    Party.findById(partyId, (error, party) => {
        if(error) {
            res.json({error: 'Unable to find party'})
        } else {
            const alreadyMember = party.members.filter(member => (member.userId == userId))
            if (alreadyMember.length !== 0) {
                res.json({success: false, message: "Already a member!"})
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
        }
    })
})

function checkIfEmpty (partyId) {
    Party.findOne({'_id': partyId}, (error, party) => {
        if (error) {
            res.json({error: 'Unable to get party!'})
        } else {
            if (party.members.length == 0) {
                Party.findByIdAndDelete(partyId, (error, result) => {
                    if(error) {
                        console.log('failure')
                    } else {
                        console.log('success')
                    }
                })
            } else {
                console.log('party is not empty')
            }
        }
    })
}

router.delete('/leave/:partyId/:userId', (req, res) => {
    const partyId = req.params.partyId
    const userId = req.params.userId

    Party.findOneAndUpdate(
        {"_id": partyId },
        {"$pull": {"members": {"userId": userId}}},
        {new:true},
        function (error, doc) {
            if (error) {
                res.json({success: false})
            } else {
                checkIfEmpty(partyId)
                res.json({success: true})
            }
        }
    )
})

router.get('/my-parties/:userId', (req, res) => {
    const userId = req.params.userId

    Party.find({"members.userId": userId}, (error, parties) => {
        if (error) {
            res.json({ error: 'Unable to get parties' })
        } else {
            res.json(parties)
        }
    })
})


module.exports = router