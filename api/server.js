const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const rentersRouter = require('./users/renters-router')
const ownersRouter = require('./users/owners-router')
const authRouter = require('./auth/auth-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/renters', rentersRouter)
server.use('/api/owners', ownersRouter)
server.use('/api', authRouter)

module.exports = server