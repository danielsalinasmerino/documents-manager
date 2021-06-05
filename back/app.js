'use strict';

// Required modules
var express = require("express");
var fileUpload = require("express-fileupload");
var session = require('express-session');
const normalize = require('normalize-path');
let CASAuthentication = require('cas-authentication');
require('dotenv').config();

// Other imports
const functions = require('./helpers/functions/functions');

// Helpful log
functions.logWithFormat('Start point for app.js!');

// Environment variables
const CONTEXT_PATH_1 = normalize(process.env.CONTEXT1);
//functions.logWithFormat('CONTEXT_PATH_1 ' + CONTEXT_PATH_1);
const CONTEXT_PATH_2 = normalize(process.env.CONTEXT2);
//functions.logWithFormat('CONTEXT_PATH_2 ' + CONTEXT_PATH_2);
const CONTEXT_PATH_3 = normalize(process.env.CONTEXT3);
//functions.logWithFormat('CONTEXT_PATH_3 ' + CONTEXT_PATH_3);
const SERVICE = process.env.SERVICE;
//functions.logWithFormat('SERVICE ' + SERVICE);
const CAS_URL = process.env.CAS;
//functions.logWithFormat('CAS_URL ' + CAS_URL);
const DEV_ENVIRONMENT = (process.env.DEV === 'true');
//functions.logWithFormat('DEV_ENVIRONMENT ' + DEV_ENVIRONMENT);
const SESSION_SECRET = process.env.SESSION_SECRET;
//functions.logWithFormat('SESSION_SECRET ' + SESSION_SECRET);

// We create our App
var app = express();
// We configure this in order to be able to upload files
app.use(fileUpload());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// CAS configuration
let cas = new CASAuthentication({
    cas_url: CAS_URL,
    service_url: SERVICE,
    cas_version: '3.0',
    session_info: 'user',
    destroy_session: true
});

// Routing Files
const sections_routes = require('./routes/section');
const documents_routes = require('./routes/document');
const users_routes = require('./routes/user');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// We set up an Express session, which is required for CASAuthentication.
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// We configure the routes and also CAS
const path = require('path');
if (DEV_ENVIRONMENT) {
    app.use(normalize(CONTEXT_PATH_1), express.static(path.resolve(__dirname, './client/build')));
    app.use(normalize(CONTEXT_PATH_2), express.static(path.resolve(__dirname, './client/build')));
    app.use(normalize(CONTEXT_PATH_3), express.static(path.resolve(__dirname, './client/build')));
}
else {
    app.use(normalize(CONTEXT_PATH_1), express.static(path.join(__dirname, 'client/build')));
    app.use(normalize(CONTEXT_PATH_2), express.static(path.join(__dirname, 'client/build')));
    app.use(normalize(CONTEXT_PATH_3), express.static(path.join(__dirname, 'client/build')));
    // If we are not on DEV (we are on PRUEBAS or PROD), we activate the CAS service
    app.get((CONTEXT_PATH_1 + '/edicion-contenidos'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_2 + '/edicion-contenidos'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_3 + '/edicion-contenidos'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_1 + '/gestion-editores'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_2 + '/gestion-editores'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_3 + '/gestion-editores'), cas.bounce, function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_1 + '/vista-previa'), function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_2 + '/vista-previa'), function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
    app.get((CONTEXT_PATH_3 + '/vista-previa'), function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
    });
}

// We create a route to let the Front know which CAS user we are
app.get((CONTEXT_PATH_1 + '/api/user-logged'), function routeHandler(req, res) {
    //res.json({mail: "Email"});
    res.json(req.session.user);
});

// Upload Files Endpoint
app.post((CONTEXT_PATH_1 + '/api/upload-document'), (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    const oldFileName = file.name;
    const newFileName = functions.makeIdLong() + '_' +  oldFileName;
    const uploadPathForFile = `${__dirname}/client/public/uploads/${newFileName}`;

    file.mv(uploadPathForFile, err => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ oldFileName: oldFileName, newFileName: newFileName, filePath: uploadPathForFile });
    });
});

// Routing: We could use any route, we choose CONTEXT_PATH_1 just because we want
const routingStart = normalize(CONTEXT_PATH_1) + '/api';
app.use(routingStart, sections_routes);
app.use(routingStart, documents_routes);
app.use(routingStart, users_routes);

// Export
module.exports = app;