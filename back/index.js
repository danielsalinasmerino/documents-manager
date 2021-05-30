'use strict';

// Required modules
var mongoose = require('mongoose');
var app = require('./app');

// Other imports
const functions = require('./helpers/functions/functions');
const variables = require('./environment');

// Environment variables
const port = variables.variables.port;
const connectionDB = variables.variables.connection;

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