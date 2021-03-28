const express = require('express')

const Renter = require('./users-model')
const { restricted } = require('../middleware/auth-mw')
const { validateItemId } = require('../middleware/items-mw')
const { checkIfRenter } = require('../middleware/renters-mw')

const router = express.Router()

router.use(restricted)

//gets item by the item id
router.get('/:id', checkIfRenter, validateItemId, (req, res) => {
    res.status(200).json(res.item)
})

router.get('/', (req, res) => {
    Renter.findAllItems()
      .then(items => {
          res.status(200).json(items)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err.message}`
          })
      })
})



module.exports = router