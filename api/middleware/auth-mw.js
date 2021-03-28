const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const User = require('../users/users-model')

//mw to verify token
function restricted(req, res, next) {
    const token = req.headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'Token not found. Please provide token.'
        })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: 'Token is not valid.'
                })
            } else {
                req.decodedToken = decoded
                next()
            }
        })
    }
}

//function thatvalidates that username and password are there 
//and that password is a string only returns Boolean
function validate(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string')
}

//mw verify that username and password are passed in
//sends err message if one is missing
function verifyLoginReq(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(401).json({
            message: 'Username and password are required'
        })
    } else {
        next()
    }
}

async function isUserInDb(req, res, next) {
    try{
        const rows = await User.findUserBy({username: req.body.username})
        if(!rows.length) {
            next()
        } else {
            res.status(400).json({
                message: 'Username is taken.'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: `Server error: ${err.message}`
        })
    }
}

//makes the token that is necessary for users to have access
function makeToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = {
    restricted,
    validate,
    verifyLoginReq,
    isUserInDb,
    makeToken
}