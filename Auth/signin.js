const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Model/user')
const router = express()

const secret = 'a12s45f78w45a21c055s5d4as8d45a5ds454asd54'
const refreshSecret = 'w45wer65sdf656a5sd6578das12asd5a6sd68asd7'

router.post('/', (req, res) => {
    User.findOne({
        where: {
          username: req.body.username
        }
    })
    .then(user => {

        if(!user){
            res.status(401).send('cannot find user')
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(authBool => {
                if(authBool){
                    let accessToken = createAccessToken(user.username)
                    let refreshToken = createRefreshToken(user.username)
                    res.status(200).send({accessToken, refreshToken})
                }else{
                    res.status(403).send('wrong password')  
                }
            })
            .catch(err => {
                res.status(500).send('login not complete')
            })
        }
    })
    .catch(err => {
        res.status(500).send('error')
    })
    
})

function createAccessToken(username){
    return jwt.sign({username}, secret, {expiresIn: '20s'})
}

function createRefreshToken(username){
    return jwt.sign({username}, refreshSecret)
}

module.exports = router