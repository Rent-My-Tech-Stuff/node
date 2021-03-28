const express = require('express')

const OwnerItem = require('./owners-model')
const {
    checkIfOwner,
    validateOwnerId
} = require('../middleware/owners-mw')
const {
    verifyItemReq,
    verifyEditItem,
    validateItemId
} = require('../middleware/items-mw')
const { restricted } = require('../middleware/auth-mw')

const router = express.Router()

router.use(restricted)
router.use(checkIfOwner)

//gets items by owner id
router.get('/:id', validateOwnerId, (req, res) => {
    OwnerItem.getItemsByOwnerId(req.params.id)
      .then(items => {
          res.status(200).json(items)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err.message}`
          })
      })
})

//gets item by item id
router.get('/item/:id', validateItemId, (req, res) => {
    res.status(200).json(res.item)
})

module.exports = router
