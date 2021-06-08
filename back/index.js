'use strict';

// Required modules
var mongoose = require('mongoose');
var app = require('./app');
require('dotenv').config();

// Other imports
const functions = require('./helpers/functions/functions');

// Environment variables
const port = process.env.PORT;
const connectionDB = process.env.CONNECTION_DB;

// Required models
var User = require('./models/user');

// ADMIN data
const adminUsers = require('./helpers/resources/adminUsers');

function createNewUserWithAdminData(data) {
    var user = new User();
    user.idUser = data.idUser;
    user.email = data.email;
    user.role = data.role;
    user.name = data.name;
    return user;
}

mongoose.Promise = global.Promise;
// Connecting to the DB
mongoose.connect(connectionDB)
    .then(() => {
        functions.logWithFormat("Connected to the DB");
        // Creating the server
        app.listen(port, () => {
            functions.logWithFormat("Server runnning on port: " + port);
            // Admin handler
            functions.logWithFormat("We must check if the admin user is on the DB.");
            User.find({}).exec((err, users) => {
                if ((users.filter(user => user.role === 'admin')).length < 1) {
                    functions.logWithFormat("We have found an Admin. We do nothing.");
                }
                else {
                    functions.logWithFormat("We must create an Admin.");
                    for (let i = 0; i < adminUsers.length; i++) {
                        var user = createNewUserWithAdminData(adminUsers[i]);
                        user.save((err, userStored) => {
                            functions.logWithFormat("Created Admin User with email: " + adminUsers[i].email);
                        });
                    }
                }
            });
        });
    })
    .catch((error) => {
        functions.logWithFormat(error);
    });