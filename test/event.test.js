const request = require("supertest");
const app = require("../src/app");
const Event = require("../src/models/events");
const { userOneId, userOne, eventOneId, eventOne,eventTwoId, userTwo, setupDb } = require('./db');

beforeEach(setupDb);

test("Create Event", async () => {
  await request(app)
  .post("/event/create")
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send({
    title: "Event 1",
    description: "Dancing on the Beats",
    event_date: "2022-05-01",
    event_time: "19:30",
    place: "Udaipur",
    maximum_participants_allowed: 50
  })
  .expect(201);
});

test("Update event", async () => {
  await request(app)
  .patch(`/event/update/${eventOneId}`)
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send({
    title: "Event 001",
    description: "Dancing on the Beats",
    event_date: "2022-05-01",
    event_time: "19:30",
    place: "Udaipur",
    maximum_participants_allowed: 50
  })
  .expect(200);
  const event = await Event.findById(eventOneId);
  expect(event.title).toEqual('Event 001');
});

test("Get all events", async () => {
  await request(app)
  .get("/event/getall")
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send()
  .expect(200);
});


test("Join Event", async () => {
  await request(app)
  .post(`/event/join/${eventOneId}`)
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send()
  .expect(200);
});

test("Leave Event", async () => {
  await request(app)
  .post(`/event/leave/${eventTwoId}`)
  .set('Authorization', `${userTwo.tokens[0].token}`)
  .send()
  .expect(200);
});

test("Get All Participants of an event", async () => {
  await request(app)
  .get(`/event/allparticipants/${eventOneId}`)
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send()
  .expect(200);
});


test("Get event creator details", async () => {
  await request(app)
  .get(`/event/getcreaterdetail/${eventOneId}`)
  .set('Authorization', `${userOne.tokens[0].token}`)
  .send()
  .expect(200);
});


