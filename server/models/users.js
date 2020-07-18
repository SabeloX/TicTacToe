const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    ranking: Number
})

// Encrypt The Password
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next()
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed
        return next()
        
    }
    catch(error){
        return next(error)
    }
})

// Check and compare passwords on sign in
userSchema.methods.comparePassword = async function(attempt, next){
    try{
        return await bcrypt.compare(attempt, this.password)
    }
    catch(error){
        next(error)
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User