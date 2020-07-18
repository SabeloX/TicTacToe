const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{

    const token = req.headers['x-access-token']
    
    if(!token){
        next(new Error("No Token Provided"))
    }

    jwt.verify(token ,process.env.SECRET, (error, decoded) =>{

        if(error){
            next(new Error("Failed to authorise token"))
        }

        req.decoded = decoded
        next()
    })
}