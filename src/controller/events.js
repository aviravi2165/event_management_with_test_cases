const Event = require('../models/events');
const User = require('../models/users');
const ApiError = require('../errors/apiError');
const ApiSuccess = require('../success/apiSuccess');
const { validationResult } = require('express-validator');

const createEvent = async (req, res, next) => {
    try {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            let newErrorObj = {};
            errors.errors.forEach(e => {
                newErrorObj[e.param] = e.msg;
            });
            throw new Error(JSON.stringify(newErrorObj));
        }

        const allowedFields = ["title", "description", "place", "participants", "maximum_participants_allowed"];
        const sanitizedEventBody = {};
        allowedFields.forEach(fields => {
            if (req.body.hasOwnProperty(fields)) {
                sanitizedEventBody[fields] = req.body[fields];
            }
        });
        sanitizedEventBody.event_date_time = `${req.body.event_date}T${req.body.event_time}`;
        sanitizedEventBody.event_created_by = req.user._id;
        const event = new Event(sanitizedEventBody);
        await event.save();
        next(ApiSuccess.created(event));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
const updateEvent = async (req, res, next) => {
    try {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            let newErrorObj = {};
            errors.errors.forEach(e => {
                newErrorObj[e.param] = e.msg;
            });
            throw new Error(JSON.stringify(newErrorObj));
        }
        const id = req.params.id;
        const allowedFields = ["title", "description", "place", "participants", "maximum_participants_allowed"];
        const sanitizedEventBody = {};
        allowedFields.forEach(fields => {
            if (req.body.hasOwnProperty(fields)) {
                sanitizedEventBody[fields] = req.body[fields];
            }
        });
        sanitizedEventBody.event_date_time = `${req.body.event_date}T${req.body.event_time}`;

        const event = await Event.findByIdAndUpdate(id, { ...sanitizedEventBody });
        next(ApiSuccess.ok(event));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
const otherUserEvent = async (req, res, next) => {
    try {
        const events = await Event.find({}).select("-participants");
        next(ApiSuccess.ok(events));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const joinEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        if(!event){
            throw new Error("No Event Found");
        }
        if (event.participants.indexOf(req.user._id) >= 0) {
            throw new Error("Already participated in the event");
        }
        if (event.participants.length >= event.maximum_participants_allowed) {
            throw new Error("Participants allowed list full");
        }
        event.participants.push(req.user._id);
        await Event.findByIdAndUpdate(id, { participants: event.participants });

        next(ApiSuccess.ok("Event Joined Successfully"));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const leaveEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findOne({_id:id,participants:req.user._id});
        if(!event){
            throw new Error("Event not Found with your participation");
        }
        const newParticipantsList = event.participants.filter(p => p.toString() !== req.user._id.toString());
        await Event.findByIdAndUpdate(id, { participants: newParticipantsList });
        next(ApiSuccess.ok("Event left successfully"));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const getParticipants = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id).select('participants').populate('participants');
        if(!event){
            throw new Error("Event not Found");
        }
        next(ApiSuccess.ok(event.participants));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

const getTaskCreatorDetails = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id).select('event_created_by').populate('event_created_by');
        if(!event){
            throw new Error("Event not Found");
        }
        next(ApiSuccess.ok(event.event_created_by));
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}


module.exports = {
    createEvent,
    updateEvent,
    otherUserEvent,
    joinEvent,
    leaveEvent,
    getParticipants,
    getTaskCreatorDetails
}