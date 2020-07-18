const router = require('express').Router()
const {login, newUser} = require('../handlers/authentication')

router.post('/register', newUser)
router.post('/login', login)

module.exports = router