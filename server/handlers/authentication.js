const {User} = require('../models')
const jwt = require('jsonwebtoken')

const newUser = async function(req, res, next){
    try{
        const user = await User.create(req.body)
        console.log(user)
        res.status(201).send({username: user.username})
    }
    catch(error){
        console.log(error.status)
        if(error.code === 11000){
            error.message = 'Username is already taken'
        }
        else{
            error.message = 'Password Too Short. Try at least six characters'
        }
        return next(error)
    }
}

const login = async function(req, res, next){
    try{
        const user = await User.findOne({username: req.body.username})

        if(user){
            const valid = await user.comparePassword(req.body.password)

            if(valid){
                const {id, username} = user
                res.status(200).send({id, username})
            }
            else{
                throw new Error("Invalid Password")
            }
        }
        else{
            throw new Error("Invalid Username")
        }

        const token = jwt.sign({username}, process.env.SECRET)
        res.json({id: _id, username, token})
    }
    catch(error){
        console.log('Cannot Login I guess')
        next(error)
    }
}

module.exports = {
    newUser,
    login
}