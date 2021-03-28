const express = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../users/users-model')
const { 
    validate,
    verifyLoginReq,
    isUserInDb,
    makeToken
} = require('../middleware/auth-mw')

const router = express.Router()

router.post('/register', isUserInDb, (req, res) => {
    const credentials = req.body
    if(validate(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10
        const hash = bcryptjs.hashSync(credentials.password, rounds)
        credentials.password = hash
        User.addUser(credentials)
          .then(user => {
              res.status(201).json(user)
          })
          .catch(err => {
              res.status(500).json({
                  message: `Server error: ${err.message}`
              })
          })
    } else {
        res.status(400).json({
            message: 'Please provide username and password and the password must be alphanumeric.'
        })
    }
})

router.post('/login', verifyLoginReq, (req, res) => {
    const { username, password } = req.body
    if(validate(req.body)) {
        User.findUserBy({ username: username})
          .then(([user]) => {
              if(user && bcryptjs.compareSync(password, user.password)) {
                  const token = makeToken(user)
                  const userInfo = {
                      user_id: user.user_id,
                      username: user.username,
                      role: user.role
                  }
                  res.status(200).json({
                      user: userInfo, token: token
                  })
              } else {
                  res.status(401).json({
                      message: 'Invalid username and/or password.'
                  })
              }
          })
          .catch(err => {
              res.status(500).json({
                  message: `Server error: ${err.message}`
              })
          })
    } else {
        res.status(400).json({
            message: 'Please provide username and password and the password must be alphanumeric.'
        })
    }
})

module.exports = router