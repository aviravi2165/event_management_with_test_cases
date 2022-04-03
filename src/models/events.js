const mongoose = require("mongoose");
const validator = require("validator");
const moment = require('moment');
const User = require('./users');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    event_date_time: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    maximum_participants_allowed: {
        type: Number,
        required: true,
        default:0
    },
    event_created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamp: true
});

eventSchema.methods.toJSON = function(){
    const updatedEvent = this.toObject();
    updatedEvent.event_date = moment(updatedEvent.event_date_time).format('YYYY-MM-DD');
    updatedEvent.event_time = moment(updatedEvent.event_date_time).format('HH:mm');
    delete updatedEvent.event_date_time;
    return updatedEvent;
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;