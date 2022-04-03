# Event Management System

Task for NodeJS practical.

> You need to create a public github repository and push the code there.

> Try to make commit messages as specific as possible

> Include this file along with the submission with the features marked as `[X]` that you have implemented.

Purpose of this system is to manage public events.

## API list

- [ ] Signup using Email and Password
- [ ] Login using Email and Password
- [ ] View profile
- [ ] Edit Profile. Can edit following details:
  - FirstName, LastName, Date of Birth, Gender
- [ ] Update profile photo (store file in a folder on file system)
- [ ] Create a new event with following details:
  - Title (string)
  - Description (text)
  - Event Date
  - Event Time (start time)
  - Place (string)
  - Participants (Array of users who will be participating in this event)
  - Maximum participants allowed (number)
- [ ] View events other users have created
- [ ] Join an event
- [ ] Leave an event
- [ ] Get participants of an event
- [ ] Get details of creator of an event

## Technologies/Packages to use

- Backend: NodeJS
- Database: MongoDB
- ODM: Mongoose preferable

## Things that will be tested at time of evaluation

- Number of features functional at the time of submission
- Getting started guide
- API Documentation
- Schema definition for database models
- Request Payload Validation
- Authorization
- Error handling
- Security (Password saved in database, exposing data publically, etc.)
- Test cases
- Code quality
