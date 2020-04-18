const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Model/user')
const router = express()

router.post('/', (req, res) => {

    let {username, password} = req.body

    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        User.create({
            username: username,
            password: hashedPassword
        })
        .then(data => {
            res.status(200).send('user added')
        })
        .catch(err => {
            res.status(500).send('error')
        })
    })
    .catch(err => {
        res.status(500).send('sign up not complete')
    })
})

module.exports = router
