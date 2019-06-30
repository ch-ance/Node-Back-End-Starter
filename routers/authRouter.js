const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user
                res.status(200).json({
                    message: `Welcome ${user.username}!`
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Something went wrong' })
        })
})

module.exports = authRouter
