const pool = require('../config/connectDB')
const jwt = require('jsonwebtoken')

function authenticationToken(req, res, next) {
    // console.log('authenting')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(authHeader)
    console.log(token)
    if (token == null) return res.sendStatus(401)
    // console.log(process)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        console.log('done')
        next()
    })
}



module.exports = {
    authenticationToken,
}