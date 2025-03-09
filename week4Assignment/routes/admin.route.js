const express = require('express')
const router = express.Router();

const {adminLogin} = require('../controllers/admin.controller.js')


router.post('/', adminLogin)


module.exports = router;