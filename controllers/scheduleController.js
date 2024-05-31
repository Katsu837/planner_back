const scheduleService = require('../service/scheduleService')
async function createSchedule (req, res, next) {
    try {
        const userId = req.params.id
        const {nameSchedule, participants} = req.body
        const schedule = await scheduleService.createSchedule(userId, nameSchedule, participants)
        return res.json(schedule)
    } catch (e) {
        next(e)
    }
}
async function getScheduleEvents (req, res, next) {
    try {
        const userId = req.params.id
        const {startDate, endDate, scheduleId} = req.body
        const arrayEvents = await scheduleService.getAllEventBySchedule(userId, startDate, endDate, scheduleId)
        return res.json(arrayEvents)
    } catch (e) {
        next(e)
    }
}

async function addParticipants (req, res, next) {
    try {
        const userId = req.params.id
        const {participants, scheduleId} = req.body
        const schedule = await scheduleService.addParticipants(userId, participants, scheduleId)
        return res.json(schedule)
    } catch (e) {
        next(e)
    }
}

async function deleteSchedule (req, res, next) {
    try {
        const userId = req.params.id
        const {scheduleId} = req.body
        await scheduleService.deleteSchedule(userId, scheduleId)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createSchedule,
    deleteSchedule,
    getScheduleEvents,
    addParticipants
}