// const User = require('../users/users-model')

//checks if user is renter
function checkIfRenter(req, res, next) {
    if(req.decodedToken && req.decodedToken.role === 'renter') {
        next()
    } else {
        res.status(403).json({
            message: 'You are not authorized. The role of renter is required.'
        })
    }
}

module.exports = {
    checkIfRenter,
}