const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/users");
const Event = require("../src/models/events");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    first_name: "Naksh",
    last_name: "Pratap",
    date_of_birth: "2000-11-05",
    gender: "Male",
    email: "naksh@gmail.com",
    password: "123",
    tokens: [
        {
            token: jwt.sign(
                { _id: userOneId },
                process.env.JWTTOKEN
                ),
            },
        ]
    };
    const userTwoId = new mongoose.Types.ObjectId();
    const userTwo = {
        _id: userTwoId,
        first_name: "Rudra",
        last_name: "Sharma",
        date_of_birth: "1990-04-05",
        gender: "Male",
        email: "rudra@gmail.com",
        password: "123",
        tokens: [
            {
                token: jwt.sign(
                    { _id: userTwoId },
                    process.env.JWTTOKEN
                    ),
                },
            ],
        };
        
        const eventOneId = new mongoose.Types.ObjectId();
        const eventOne = {
            _id: eventOneId,
            title: "Event 1",
            description: "Hiking",
            event_date_time: "2022-05-01 19:30",
            place: "Udaipur",
            maximum_participants_allowed: 50,
            event_created_by: userOne._id
        };
        
        const eventTwoId = new mongoose.Types.ObjectId();
        const eventTwo = {
            _id: eventTwoId,
            title: "Event 2",
            description: "Dancing",
            event_date_time: "2022-05-01 19:30",
            place: "Udaipur",
            participants:[
                userOneId,
                userTwoId
            ],
            maximum_participants_allowed: 50,
            event_created_by: userOne._id
        };
        
        const eventThreeId = new mongoose.Types.ObjectId();
        const eventThree = {
            _id: eventThreeId,
            title: "Event 3",
            description: "Swiming",
            event_date_time: "2022-05-01 19:30",
            event_time: "19:30",
            place: "Udaipur",
            participants:[
                userOneId
            ],
            maximum_participants_allowed: 50,
            event_created_by: userTwo._id
        };
        
        
        const setupDb = async () => {
            await User.deleteMany();
            await Event.deleteMany();
            await new User(userOne).save();
            await new User(userTwo).save();
            await new Event(eventOne).save();
            await new Event(eventTwo).save();
            await new Event(eventThree).save();
        }
        
        module.exports = {
            userOneId,
            userOne,
            userTwoId,
            userTwo,
            eventOne,
            eventOneId,
            eventTwo,
            eventTwoId,
            eventThree,
            eventThreeId,
            setupDb,
        }