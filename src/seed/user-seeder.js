const User = require('../models/users');
const mongoose = require('mongoose');
const userId1 = new mongoose.Types.ObjectId;
const userId2 = new mongoose.Types.ObjectId;

const users = [
    new User({
        "_id": userId1,
        "first_name": "Ravi",
        "last_name": "Asari",
        "date_of_birth": "1990-04-11",
        "gender": "Male",
        "email": "ravi@gmail.com",
        "password": "123"
    }),
    new User({
        "_id": userId2,
        "first_name": "Naveen",
        "last_name": "Kumar",
        "date_of_birth": "1995-01-01",
        "gender": "Male",
        "email": "naveen@gmail.com",
        "password": "123"
    })
];

module.exports = { users, userId1, userId2 };