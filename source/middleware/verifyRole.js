const pool = require('../config/connectDB')
const jwt = require('jsonwebtoken')

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // console.log(allowedRoles)
        if (!req?.body.role) return res.sendStatus(401)
        const roleArray = [...allowedRoles]
        console.log(roleArray)
        console.log(typeof (req.body.role))
        if (!roleArray.includes(req.body.role)) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRoles