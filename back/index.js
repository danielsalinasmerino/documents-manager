'use strict';

// Required modules
var mongoose = require('mongoose');
var app = require('./app');
const normalize = require('normalize-path');
require('dotenv').config();

// Other imports
const functions = require('./helpers/functions/functions');
const variables = require('./environment');

// Environment variables
const port = variables.variables.port;
const connectionDB = variables.variables.connection;

// Use React app
const path = require('path');
const express = require('express');

//app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(normalize('/pas/gestor-documental'), express.static(path.join(__dirname, 'client/build')));
console.log(express.static(path.join(__dirname, 'client/build'))

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