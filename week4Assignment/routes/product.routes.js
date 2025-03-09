const express = require('express')
const router = express.Router();
const {createProduct,getAllProduct,getSingleProduct,updateSingleProduct} = require('../controllers/product.controller.js');

// product routes
router.post('/create', createProduct)

router.get('/', getAllProduct)
router.get('/:id',getSingleProduct)
router.put('/:id', updateSingleProduct)



module.exports = router;


