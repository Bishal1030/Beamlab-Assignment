const express = require('express')
const router = express.Router();
const {createOrders,getAllOrders,deleteOrders} = require('../controllers/order.controller.js')
const {authenticate,authority} = require('../middleware/auth.middleware.js')


// order routes
router.get('/', authenticate, authority, getAllOrders) // get orders
router.post('/:id', authenticate,createOrders)
router.delete('/:id', deleteOrders)

module.exports = router;


