const express = require('express')
const router = express.Router()
const basicAuth = require('../middleware/basicAuth')
const bcrypt = require('bcrypt')

const users = []
let id = users.length + 1

// When a POST request is made to /user with email and password in the body, the password should be salted and hashed before the user is saved in the data store.
router.post('/', basicAuth, async (req, res) => {
    const { email, password } = req.user

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: ++id,
        email,
        password: hashedPassword
    }
    users.push(newUser)
    res.status(201).json({ id, email })
})

module.exports = router


