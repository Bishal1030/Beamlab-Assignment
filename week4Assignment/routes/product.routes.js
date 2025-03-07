const express = require('express')
const router = express.Router();
const {createProduct,getAllProduct,getSingleProduct,updateSingleProduct} = require('../controllers/product.controller.js');

router.post('/create', createProduct)
router.get('/products', getAllProduct)
router.get('/products/:id',getSingleProduct)
router.put('/products/:id', updateSingleProduct)


module.exports = router;


