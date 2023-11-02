const express = require('express');
const router = express.Router();
const userController = require('../api/userApi.js')

router.post('/api/register', userController.registerUser);
router.get('/api/getUser', userController.getUsers);
router.post("/api/login", userController.loginUser);


module.exports = router;