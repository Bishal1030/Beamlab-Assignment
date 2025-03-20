const express = require('express')
const router = express.Router();

const {userLogin} = require('../controllers/auth.controller.js')


router.post('/user/login',  userLogin)
router.post('/admin/login', userLogin)


module.exports = router;