const eventService = require('../service/eventService')

async function createEvent (req, res, next) {
    try {
        const {eventName, eventType, startTimeEvent, endTimeEvent, eventAddress, repeatStatus, scheduleId} = req.body
        console.log(req.body)
        console.log(new Date(startTimeEvent), new Date(endTimeEvent))
        const event = await eventService.addEvent(
            eventName,
            eventType,
            new Date(startTimeEvent),
            new Date(endTimeEvent),
            eventAddress,
            repeatStatus,
            scheduleId )
        console.log(event)
        return res.json(event)
    } catch (e) {
        next(e)
    }
}

async function editEvent (req, res, next) {
    try {
        const eventId = req.params.id
        const {eventName, eventType, startTimeEvent, endTimeEvent, eventAddress, repeatStatus, scheduleId} = req.body
        const event = await eventService.updateEvent(
            eventId,
            eventName,
            eventType,
            new Date(startTimeEvent),
            new Date(endTimeEvent),
            eventAddress,
            repeatStatus,
            scheduleId)
        return res.json(event)
    } catch (e) {
        next(e)
    }
}

async function getEvents (req, res, next) {
    try {
        const {startDate, endDate} = req.body
        console.log(startDate, endDate)
        const eventArray = await eventService.getAllEvent(startDate, endDate)
        return res.json(eventArray)
    } catch (e) {
        next(e)
    }
}

async function deleteEvent (req, res, next) {
    try {
        const eventId = req.params.id
        const response = await eventService.deleteEvent(eventId)
        return res.json(response)
    } catch (e) {
        next(e)
    }
}
async function deleteOneOfRepeatEvent (req, res, next) {
    try {
        const eventId = req.params.id
        const {startDate, endDate} = req.body
        const response = await eventService.deleteOneOfRepeatEvent(eventId, new Date(startDate), new Date(endDate))
        return res.json(response)
    } catch (e) {
        next(e)
    }
}



module.exports = {
    createEvent,
    editEvent,
    getEvents,
    deleteEvent,
    deleteOneOfRepeatEvent
}

