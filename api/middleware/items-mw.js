const Item = require('../users/owners-model')

function verifyItemReq(req, res, next) {
    const { name, category, price_per_day, rental_period, description} = req.body
    if(!name) {
        res.status(400).json({
            message: 'Item name required'
        })
    } else if(!category) {
        res.status(400).json({
            message: 'Item category required'
        })
    } else if(!price_per_day) {
        res.status(400).json({
            message: 'Item price required'
        })
    } else if(!rental_period) {
        res.status(400).json({
            message: 'Rental period required'
        })
    } else if(!description) {
        res.status(400).json({
            message: 'Description required'
        })
    } else {
        req.params.id = req.body.user_id
        next()
    }
}

function verifyEditItem(req, res, next) {
    const { name, category, price_per_day, rental_period, description} = req.body
    if(!name) {
        res.status(400).json({
            message: 'Item name required'
        })
    } else if(!category) {
        res.status(400).json({
            message: 'Item category required'
        })
    } else if(!price_per_day) {
        res.status(400).json({
            message: 'Item price required'
        })
    } else if(!rental_period) {
        res.status(400).json({
            message: 'Rental period required'
        })
    } else if(!description) {
        res.status(400).json({
            message: 'Description required'
        })
    } else {
        next()
    }
}

function validateItemId(req, res, next) {
    Item.getItemByItemId(req.params.id)
      .then(item => {
          if(item) {
              res.item = item
              next()
          } else {
              res.status(404).json({
                  message: 'Invalid id, item not found.'
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
    verifyItemReq,
    verifyEditItem,
    validateItemId
}