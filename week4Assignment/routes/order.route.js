const express = require('express')
const router = express.Router();
const {createOrders,getAllOrders,deleteOrders} = require('../controllers/order.controller.js')



// order routes
router.get('/', getAllOrders) // get orders
router.post('/:id', createOrders)
router.delete('/:id', deleteOrders)

module.exports = router;


