Hi,

As per the instruction on the mail I have created the Event Management APIs.

===========Important Note===========
    - I have created 2 environment in the app one for development and one for testing.
    - Develpoment Enviraonment - (npm run dev)
        I have used "nodemon" in the developent environment
    - Testing enviroment - (npm run test)
        I have used "jest" and "supertest" in the developemnt environment
    - Seeding Data - (npm run seed)
        I have created script to start the seeding process
    - I am using "env-cmd" for executing comands an environment from an env file in both prod and test environement.
    - I am using mongodb Atlas for the database
    
===========Dependancy===========
devDependencies
     - env-cmd
     - jest - testing framework 
     - supertest - testing
     - nodemon - node restart when saved
  },
  dependencies: {
     - bcrypt: password encription
     - express: hosting server
     - express-validator: for user input validation
     - jsonwebtoken: to create a tokenizing machanism for the user who login from multiple devices
     - moment: to modify date and time formats
     - mongoose: database operations
     - multer: fileupload
     - validator: to create custom validation in the schema 
  }

===========Folder Structure of the App===========
Config
    - <dev.env> (It has all evironment variables for the devlopment environment)
    - <test.env> (It has all evironment variables for the testing environment)

Docs
    - User Docs.txt (Documentation of APIs related to Users)
    - Event Docs.txt (Documentation of APIs related to Events)

src
    - controller - all controller files of routers
    - db - mongodb connection using mongoose
    - errors - error handling library and handler
    - helper - miscellanious helper functions
    - middleware - authentication middle ware
    - models - models and schema
    - routers - all routers routers
    - seed - seeder code for initial startup
    - success - success handling library and handler
    - uploader - file upload helper using multer
    - app.js - express server app
    - index.js - server creation

test
    - 1.png - sample profile pic file for testing
    - db.js - initialization of testing environment by creating seperate database and with some sample entries
    - event.test.js - test cases for events related APIs
    - user.test.js - test cases for users related APIs

thunder-client-config
    - thunder-collection_ThinWik.json - exported file of thunderclient collection API calls
    - thunder-environment_Thinkwik.json - exported file of thunderclient environment Variables

uploads
    - users - folder where all the profile images get stored
