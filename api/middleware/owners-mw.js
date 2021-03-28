const User = require('../users/users-model')

//checks to make sure only owners have access and not renters
function checkIfOwner(req, res, next) {
    if(req.jwt && req.jwt.role === 'owner') {
        next()
    } else {
        res.status(403).json({
            message: 'You are not authorized. The role of owner is required.'
        })
    }
}

//mw checks to make sure the owner id is valid
function validateOwnerId(req, res, next) {
    User.findById(req.params.id)
      .then(user => {
        if(user) {
            res.user = user;
            next()
        } else {
            res.status(404).json({
                message: 'Invalid id, user not found'
            })
        }
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err.message}`
          })
      })
}

module.exports = {
    checkIfOwner,
    validateOwnerId
}