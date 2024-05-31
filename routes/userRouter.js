const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)



module.exports = router

