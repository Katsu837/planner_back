const sequelize = require("express");
const {QueryTypes, Op} = require("sequelize");
const {Event, Schedule, EventDate} = require("../models/models");
const ApiError = require("../error/ApiError")


async function createSchedule (userId, nameSchedule, participants) {
    return await Schedule.create({
        name: nameSchedule,
        participants: [...participants, userId],
        userId: userId})
}

async function addParticipants (userId, participants, scheduleId) {
    if(await checkParticipant(userId, scheduleId)) {
        const schedule = await Schedule.findByPk(scheduleId)
        await Schedule.update({participants: [...schedule.participants, participants]}, {where: scheduleId})
    } else {
        return ApiError.forbidden()
    }
}

async function checkParticipant (userId, scheduleId) {
    const schedule = await Schedule.findByPk(scheduleId)
    return schedule.participants.includes(userId)
}
async function getAllEventBySchedule (userId, startDate, endDate, scheduleId) {
    if(!await checkParticipant(userId, scheduleId)) return ApiError.forbidden()

    const eventArray = await EventDate.findAll({where: {
            [Op.and]: [
                {start_date: {[Op.gte]: startDate}},
                {end_date: {[Op.lte]: endDate}}
            ]}
    })
    const event = []
    for (let i = 0; i < eventArray.length; i++) {
        const eventData = await Event.findByPk(eventArray[i].eventId)
        if(eventData.scheduleId !== scheduleId) continue
        const eventDate = eventArray[i]
        event[i] = {eventData, eventDate}
    }
    return event
}

async function deleteSchedule (userId, scheduleId) {
    const schedule = await Schedule.findByPk(scheduleId)
    const participants = [...schedule.participants].filter(item => item !== userId)
    if(participants.length === 0)
        await Schedule.destroy({where: scheduleId})
    else
        await Schedule.update({participants: [...participants]}, {where: scheduleId})
}

module.exports = {
    createSchedule,
    addParticipants,
    getAllEventBySchedule,
    deleteSchedule
}
