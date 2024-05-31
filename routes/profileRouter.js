const express = require('express')
const router = new express.Router()
const profileController = require('../controllers/profileController')

router.post('/editProfilePhoto/:id',profileController.editProfilePhoto)
router.post('/editProfileInfo/:id',profileController.editProfileInfo)
router.get('/profileInfo/:id', profileController.getProfileInfo)


module.exports = router