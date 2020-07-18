const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connect(process.env.DATABASE)

module.exports.User = require('./users')