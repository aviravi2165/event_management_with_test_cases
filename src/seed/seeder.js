const mongoose = require('mongoose');
mongoose.connect(`${process.env.CONNECTIONURL}`);

const { users, userId1, userId2 } = require('./user-seeder');
const { events } = require('./events-seeder');

let promisedCollection = [];

users.forEach(user => {
    promisedCollection.push(Promise.resolve(user.save()));
});


events.forEach(event => {
    promisedCollection.push(Promise.resolve(event.save()));
});

Promise.all(promisedCollection)
.then((res) => console.log("Seeds Entered"))
.catch(err => console.log(err.message));
    
    
    