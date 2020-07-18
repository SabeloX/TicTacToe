exports.notFound = (req, res, next) =>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
}

exports.error = (error, req, res, next) =>{
    res.status(error.status || 400).json({error: error.message || "Something Went Wrong"})
}