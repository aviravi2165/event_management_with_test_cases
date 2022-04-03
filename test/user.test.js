const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");
const { userOneId, userOne, setupDb } = require('./db');

beforeEach(setupDb);

test("New User Signup", async () => {
    await request(app)
    .post("/user/signup")
    .send({
        first_name: "Gauransh",
        last_name: "Asari",
        date_of_birth: "2019-11-05",
        gender: "Male",
        email: "gauransh@gmail.com",
        password: "123"
    })
    .expect(201);
});

test("Existing user Login test", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Non existing user login", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "abc@asd.com",
      password: "123",
    })
    .expect(404);
});

test("Profile view of User", async () => {
  await request(app)
    .get("/user/detail")
    .set(
      "Authorization",
      `${userOne.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("Profile view of un authorized User", async () => {
  await request(app)
    .get("/user/detail")
    .set("Authorization", `unauthorized key`)
    .send()
    .expect(401);
});

test("Should delete account of authenticated user", async () => {
  await request(app)
    .delete("/user/delete")
    .set(
      "Authorization",
      `${userOne.tokens[0].token}`
    )
    .send()
    .expect(200);
});

test("Should delete account of un authenticated user", async () => {
  await request(app)
    .delete("/user/delete")
    .set("Authorization", `unauthenticated token`)
    .send()
    .expect(401);
});

test("Should upoad avatar", async () => {
  await request(app)
    .post('/user/avatar')
    .set('Authorization', `${userOne.tokens[0].token}`)
    .attach('profileImage', 'test/1.png')
    .expect(200);
  const user = await User.findById(userOneId);
  expect(200);
});

test("shoud update user fields", async () => {
  await request(app)
    .patch('/user/update')
    .set('Authorization', `${userOne.tokens[0].token}`)
    .send({
        "first_name": "Avi",
        "last_name": "Asari",
        "date_of_birth": "2019-11-05",
        "gender": "Male",
        "email": "avi@gmail.com"
    })
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.first_name).toEqual('Avi');
})