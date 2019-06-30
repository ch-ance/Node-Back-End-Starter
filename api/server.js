const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('../routers/authRouter')
const Users = require('../helpers/users-model.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(morgan('combined'))

server.use('/api/auth', authRouter)

server.get('/', (_req, res) => {
    res.send('Server is up and running')
})

server.get('/api/users', (_req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.send(err))
})

module.exports = server
