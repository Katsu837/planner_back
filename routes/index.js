const express = require('express')
const router = new express.Router()
const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const eventRouter = require('./eventRouter')
const scheduleRouter = require('./scheduleRouter')

router.use('/authorization', userRouter)
router.use('/profile', profileRouter)
router.use('/schedule', scheduleRouter)
router.use('/event', eventRouter)

module.exports = router


