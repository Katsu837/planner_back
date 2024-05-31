const {Event, EventDate} = require('../models/models')
const e = require("express");
const sequelize = require("express");
const {QueryTypes, Op} = require("sequelize");


async function addRepeatStatus (repeatStatus, startTimeEvent, endTimeEvent, id) {
    switch (repeatStatus) {
        case 'everyDay':
            for (let i = 0; i < 30; i++) {
                await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
                startTimeEvent = new Date(startTimeEvent.getFullYear(), startTimeEvent.getMonth(), startTimeEvent.getDate()+i, startTimeEvent.getHours(), startTimeEvent.getMinutes(), startTimeEvent.getSeconds())
                endTimeEvent = new Date(endTimeEvent.getFullYear(), endTimeEvent.getMonth(), endTimeEvent.getDate()+i, endTimeEvent.getHours(), endTimeEvent.getMinutes(), endTimeEvent.getSeconds())
            }
            return EventDate.findAll({where: {eventId: id}});

        case 'everyWeek':
            for (let i = 0; i < 364; i+7) {
                await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
                startTimeEvent = new Date(startTimeEvent.getFullYear(), startTimeEvent.getMonth(), startTimeEvent.getDate()+i, startTimeEvent.getHours(), startTimeEvent.getMinutes(), startTimeEvent.getSeconds())
                endTimeEvent = new Date(endTimeEvent.getFullYear(), endTimeEvent.getMonth(), endTimeEvent.getDate()+i, endTimeEvent.getHours(), endTimeEvent.getMinutes(), endTimeEvent.getSeconds())
            }
            return EventDate.findAll({where: {eventId: id}});

        case 'every2Week':
            for (let i = 0; i < 364; i+14) {
                await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
                startTimeEvent = new Date(startTimeEvent.getFullYear(), startTimeEvent.getMonth(), startTimeEvent.getDate()+i, startTimeEvent.getHours(), startTimeEvent.getMinutes(), startTimeEvent.getSeconds())
                endTimeEvent = new Date(endTimeEvent.getFullYear(), endTimeEvent.getMonth(), endTimeEvent.getDate()+i, endTimeEvent.getHours(), endTimeEvent.getMinutes(), endTimeEvent.getSeconds())
            }
            return EventDate.findAll({where: {eventId: id}});

        case 'everyMonth':
            for (let i = 0; i < 12; i+1) {
                await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
                startTimeEvent = new Date(startTimeEvent.getFullYear(), startTimeEvent.getMonth()+i, startTimeEvent.getDate(), startTimeEvent.getHours(), startTimeEvent.getMinutes(), startTimeEvent.getSeconds())
                endTimeEvent = new Date(endTimeEvent.getFullYear(), endTimeEvent.getMonth()+i, endTimeEvent.getDate(), endTimeEvent.getHours(), endTimeEvent.getMinutes(), endTimeEvent.getSeconds())
            }
            return EventDate.findAll({where: {eventId: id}});

        case 'everyYear':
            for (let i = 0; i < 10; i+1) {
                await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
                startTimeEvent = new Date(startTimeEvent.getFullYear()+i, startTimeEvent.getMonth(), startTimeEvent.getDate(), startTimeEvent.getHours(), startTimeEvent.getMinutes(), startTimeEvent.getSeconds())
                endTimeEvent = new Date(endTimeEvent.getFullYear()+i, endTimeEvent.getMonth(), endTimeEvent.getDate(), endTimeEvent.getHours(), endTimeEvent.getMinutes(), endTimeEvent.getSeconds())
            }
            return EventDate.findAll({where: {eventId: id}});

        default:
            await EventDate.create({start_date: startTimeEvent, end_date: endTimeEvent, eventId: id})
            return EventDate.findOne({where: {eventId: id}});
    }
}

async function addEvent (eventName, type, startTimeEvent, endTimeEvent, eventAddress, repeatStatus, scheduleId) {
    console.log(eventName, type, startTimeEvent, endTimeEvent, eventAddress, repeatStatus, scheduleId)
    const event = await Event.create({
        name: eventName,
        type: type,
        repeat: repeatStatus,
        address: eventAddress,
        scheduleId: scheduleId
    })
    console.log(event)
    const eventDate = await addRepeatStatus(repeatStatus, startTimeEvent, endTimeEvent, event.id)
    console.log(event)
    return {event, eventDate}
}

async function updateEvent (id, eventName, type, startTimeEvent, endTimeEvent, eventAddress, repeatStatus, scheduleId) {
    let eventDate = await EventDate.findOne({where: {eventId: id}})
    let event = await Event.findByPk(id)
    if (
        event.dataValues.repeat !== repeatStatus ||
        eventDate.dataValues.start_date !== startTimeEvent ||
        eventDate.dataValues.end_date !== endTimeEvent) {
        await Event.update({repeat: repeatStatus}, {where: {id: id}})
        await EventDate.destroy({where: {eventId: id}})
        eventDate = addRepeatStatus(repeatStatus, startTimeEvent, endTimeEvent, id)
    }
    console.log(eventDate)
    await Event.update({
        name: eventName,
        type: type,
        address: eventAddress,
        scheduleId: scheduleId},
        {where:{id: id}})
    event = await Event.findByPk(id)
    eventDate = await EventDate.findAll({where: {eventId: id}})
    return {event, eventDate}
}

async function getAllEvent (startDate, endDate) {
    const eventArray = await EventDate.findAll({where: {
        [Op.and]: [
            {start_date: {[Op.gte]: startDate}},
            {end_date: {[Op.lte]: endDate}}
        ]}
    })
    console.log(eventArray)
    const event = []
    for (let i = 0; i < eventArray.length; i++) {
        const eventData = await Event.findByPk(eventArray[i].eventId)
        const eventDate = eventArray[i]
        event[i] = {eventData, eventDate}
    }
    return event
}

async function deleteEvent (id) {
    await EventDate.destroy({where: {eventId: id}})
    await Event.destroy({where: {id: id}})
    return 'Ok'
}

async function deleteOneOfRepeatEvent (id, startDate, endDate) {
    await EventDate.destroy({where: {eventId: id, start_date: startDate, end_date: endDate}})
    return 'Ok'
}

module.exports = {
    addEvent,
    updateEvent,
    getAllEvent,
    deleteEvent,
    deleteOneOfRepeatEvent
}