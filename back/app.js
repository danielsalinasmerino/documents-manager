'use strict';

// Required modules
var express = require("express");
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
const SERVICE = process.env.SERVICE;
//functions.logWithFormat('SERVICE ' + SERVICE);
const CAS_URL = process.env.CAS;
//functions.logWithFormat('CAS_URL ' + CAS_URL);
const DEV_ENVIRONMENT = (process.env.DEV === 'true');
//functions.logWithFormat('DEV_ENVIRONMENT ' + DEV_ENVIRONMENT);
const SESSION_SECRET = process.env.SESSION_SECRET;
//functions.logWithFormat('SESSION_SECRET ' + SESSION_SECRET);

// CAS configuration
let cas = new CASAuthentication({
    cas_url: CAS_URL,
    service_url: SERVICE,
    cas_version: '3.0',
    session_info: 'user',
    destroy_session: true
});

// We create our App
var app = express();

// Routing Files
const sections_routes = require('./routes/section');
const documents_routes = require('./routes/document');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// We set up an Express session, which is required for CASAuthentication.
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// If we are not on DEV (we are on PRUEBAS or PROD), we activate the CAS service
if (!DEV_ENVIRONMENT) {
    // We desactivate the CAS for the moment
    /* app.use(cas.bounce, function (req, res, next) {
        next();
    }); */
    app.get( '/pas/gestor-documental/edicion-contenidos', cas.bounce, function ( req, res ) {
        next();
    });
}

// We configure the routes for the React app
const path = require('path');
if (DEV_ENVIRONMENT) {
    app.use(normalize(CONTEXT_PATH_1), express.static(path.resolve(__dirname, './client/build')));
}
else {
    app.use(normalize(CONTEXT_PATH_1), express.static(path.join(__dirname, 'client/build')));
}

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routing
const routingStart = normalize(CONTEXT_PATH_1) + '/api';
app.use(routingStart, sections_routes);
app.use(routingStart, documents_routes);

// Export
module.exports = app;