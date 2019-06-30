require('dotenv').config()

const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret'

const Users = require('../helpers/users-model')

authRouter.post('/register', (req, res) => {
    const user = req.body

    if (!user.username || !user.password) {
        res.status(500).json({
            message: 'Registration requires both a username and password'
        })
    }

    const hash = bcrypt.hashSync(user.password, 10) // 2 ^ n
    user.password = hash

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

authRouter.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user)
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Something went wrong' })
        })
})

function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = authRouter
