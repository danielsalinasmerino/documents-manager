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

mongoose.Promise = global.Promise;
// Connecting to the DB
mongoose.connect(connectionDB)
        .then(() => {
            functions.logWithFormat("Connected to the DB");
            // Creating the server
            app.listen(port, () => {
                functions.logWithFormat("Server runnning on port: " + port);
            });
        })
        .catch((error) => {
            functions.logWithFormat(error);
        });