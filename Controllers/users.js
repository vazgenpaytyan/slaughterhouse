const express = require('express')
const checkToken = require('../Middleware/tokenVerify')
const User = require('../Model/user')
const router = express()

router.get('/', checkToken.check, (req, res) => {
    User.findAll({raw: true})
    .then(users => {
        res.status(200).send(users)
    })
    .catch(err => {
        res.status(500).send(error)
    })
})

// router.put('/', checkToken.check, async (req, res) => {
//     const user = await User.create({ username: "Jane" });
//     console.log(jane.name); // "Jane"
//     jane.name = "Ada";
//     // the name is still "Jane" in the database
//     await jane.save();
// })

module.exports = router
