const mongoose = require('mongoose');
const Event = require('../models/events');
const {userId1, userId2} = require('./user-seeder');

const events = [
    new Event({
        "title": "Event 1",
        "description": "Beach Party",
        "event_date_time": "2022-05-01T10:00",
        "place": "Goa",
        "participants":[
            userId1,
            userId2,
        ],
        "maximum_participants_allowed": 100,
        "event_created_by":userId1
    }),
    new Event({
        "title": "Event 2",
        "description": "Mountaineering",
        "event_date_time": "2022-06-01T05:00",
        "place": "Sikkim",
        "participants":[
            userId1
        ],
        "maximum_participants_allowed": 25,
        "event_created_by":userId2
    })
];

module.exports = { events };