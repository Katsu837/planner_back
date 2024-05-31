const express = require('express')
const router = new express.Router()
const eventController = require('../controllers/eventController')

router.post('/createEvent',eventController.createEvent)
router.post('/editEvent/:id',eventController.editEvent)
router.post('/getEvents', eventController.getEvents)
router.delete('/deleteEvent/:id', eventController.deleteEvent)
router.delete('/deleteOneOfRepeatEvent/:id', eventController.deleteOneOfRepeatEvent)


module.exports = router