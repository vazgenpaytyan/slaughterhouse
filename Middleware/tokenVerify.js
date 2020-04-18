const jwt = require('jsonwebtoken')
const secret = 'a12s45f78w45a21c055s5d4as8d45a5ds454asd54'

module.exports.check = function (req, res, next){
    const authHeader = req.headers['auth']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        res.status(401).send('no token sent')
    }else{
        jwt.verify(token, secret, (err) => {
            if(err){
                res.status(403).send('wrong token')
            }else{
                next()
            }
        })
    }
}

// router.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if (!refreshToken) {
//       res.status(404).send('no refresh token')
//     }
//     jwt.verify(refreshToken, refreshSecret, (err, user) => {
//       if (err) {
//         res.send('wrong refresh token')
//       } else {
//         let accessToken = createAccessToken(user)
//         res.send(accessToken)
//       }
//     })
//   })
