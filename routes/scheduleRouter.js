const express = require('express')
const router = new express.Router()
const scheduleController = require('../controllers/scheduleController')

router.post('/createSchedule/:id', scheduleController.createSchedule)
router.get('/getScheduleEvents/:id', scheduleController.getScheduleEvents)
router.delete('/deleteSchedule/:id', scheduleController.deleteSchedule)
router.post('/addParticipant/:id', scheduleController.addParticipants)


module.exports = router