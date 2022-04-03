const express = require('express');
const { auth } = require('../middleware/auth');
const { createEvent, otherUserEvent, joinEvent, leaveEvent, getParticipants, getTaskCreatorDetails, updateEvent } = require('../controller/events');
const router = new express.Router;
const { body } = require('express-validator');

router.post('/event/create', auth, [
    body('title', 'Title cannot be blank').notEmpty(),
    body('description', 'Description cannot be blank').notEmpty(),
    body('event_date', 'Event Date cannot be blank').notEmpty(),
    body('event_time', 'Event Time cannot be blank').notEmpty(),
    body('place', 'Place cannot be blank').notEmpty(),
    body('maximum_participants_allowed', 'Maximum Participation Limit cannot be blank').notEmpty(),
], createEvent);

router.patch('/event/update/:id', auth, [
    body('title', 'Title cannot be blank').notEmpty(),
    body('description', 'Description cannot be blank').notEmpty(),
    body('event_date', 'Event Date cannot be blank').notEmpty(),
    body('event_time', 'Event Time cannot be blank').notEmpty(),
    body('place', 'Place cannot be blank').notEmpty(),
    body('maximum_participants_allowed', 'Maximum Participation Limit cannot be blank').notEmpty(),
], updateEvent);

router.get('/event/getall', auth, otherUserEvent);

router.post('/event/join/:id', auth, joinEvent);

router.post('/event/leave/:id', auth, leaveEvent);

router.get('/event/allparticipants/:id', auth, getParticipants);

router.get('/event/getcreaterdetail/:id', auth, getTaskCreatorDetails);

module.exports = router;