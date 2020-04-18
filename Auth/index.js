const express = require('express')
const router = express()

router.use('/signin', require('./signin'))
router.use('/signup', require('./signup'))


module.exports = router