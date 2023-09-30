const { Events, EventLogs, User } = require("../database/models/index")
const { handleHttpError, handleErrorResponse } = require("./../helpers/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * register users
 * @param {*} req 
 * @param {*} res 
 */
const createEvent = async (req, res) => {
    try {
        const { body, file } = req
        const newEvent = await Events.create({
            name: body.name,
            description: body.description,
            event_date: body.event_date,
            place: body.place,
            imagen: file.filename,
            user_id: parseInt(body.user_id, 10),
        });
        res.status(201).json({
            message: "SUCCESSFULLY REGISTERED",
            newEvent
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
}

/**
 * get event all
 * @param {*} req 
 * @param {*} res 
 */
const getEventsAll = async (req, res) => {
    try {
        const eventsWithUsers = await Events.findAll({
            // attributes: ['id', 'name', 'description', 'place', 'imagen'],
        });
        res.status(200).json({
            message: "SUCCESSFULLY OBTAINED RECORDS",
            eventsWithUsers
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
}

/**
 * get events with pagination
 * @param {*} req 
 * @param {*} res 
 */
const getEvents = async (req, res) => {
    try {
        const eventsWithUsers = await Events.findAll({
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            }],
            attributes: ['id', 'name', 'description', 'place', 'imagen'],
            // limit: perPage,
            // offset: (page - 1) * perPage,
        });
        res.status(200).json({
            message: "SUCCESSFULLY OBTAINED RECORDS",
            eventsWithUsers
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
}

/**
 * get events from a user
 * @param {*} req 
 * @param {*} res 
 */
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findOne({
            where: {
                id: id,
            }
        });

        if (!event) {
            handleErrorResponse(res, 'THERE ARE NO RECORDS', 404);
            return
        }
        
        res.status(200).json({
            message: "SUCCESSFULLY OBTAINED RECORD",
            event
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
};

/**
 * subscribe to an event
 * @param {*} req 
 * @param {*} res 
 */
const crateEventLogs = async (req, res) => {
    try {
        const { user_id, event_id } = req.body;

        const existingEventLogs = await EventLogs.count({
            where: {
                user_id: `${user_id}`,
                event_id: event_id,
            },
        });

        if (existingEventLogs > 0) {
            handleErrorResponse(res, "YOU'RE ALREADY SINGNED IN", 409);
            return
        }

        const newEventLogs = await EventLogs.create({
            user_id: user_id,
            event_id: event_id,
            registration_date: new Date(),
        });
        res.status(201).json({
            message: "SUCCESSFULLY REGISTERED",
            newEventLogs
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
};

/**
 * get events from a user
 * @param {*} req 
 * @param {*} res 
 */
const getEventLogsUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const checkUser = await EventLogs.findOne({
            where: {
                user_id: id,
            }
        });

        if (!checkUser) {
            handleErrorResponse(res, 'USER NOT EXISTS', 404);
            return
        }

        const eventsLogsUser = await EventLogs.findAll({
            include: [Events],
            where: {
                user_id: id,
            }
        });

        res.status(200).json({
            message: "SUCCESSFULLY OBTAINED RECORD",
            eventsLogsUser
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
};

/**
 * register for the event
 * @param {*} req 
 * @param {*} user_id
 * @param {*} event_id
 */
const registerForTheEvent = async (res, user_id, event_id) => {
    try {
        const newEventLogs = await EventLogs.create({
            user_id: user_id,
            event_id: event_id,
            registration_date: new Date(),
        });

        return {
            user_id: newEventLogs.user_id,
            event_id: newEventLogs.event_id
        }
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
};

module.exports = { createEvent, registerForTheEvent, crateEventLogs, getEventsAll, getEvents, getEventLogsUserById, getEventById };