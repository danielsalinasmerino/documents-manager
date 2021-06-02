'use strict';

// Required modules
var express = require("express");
const normalize = require('normalize-path');
require('dotenv').config();
let CASAuthentication = require('cas-authentication');

// Environment variables
const contextPath1 = normalize(process.env.CONTEXT1);
let service = process.env.SERVICE;
let cas_url = process.env.CAS;
const dev_environment = process.env.DEV;

let cas = new CASAuthentication({
    cas_url: cas_url,
    //local o despliegue
    service_url: service,
    cas_version: '3.0',
    session_info: 'user',
    destroy_session: true//me borra la sesión al hacer el logout
});

// We create our App
var app = express();
var session = require('express-session');

// Routing Files
const sections_routes = require('./routes/section');
const documents_routes = require('./routes/document');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up an Express session, which is required for CASAuthentication.
app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true
}));


if (!dev_environment) {
    app.use(cas.bounce, function (req, res, next) {
        res.locals.portalName = 'pruebas';
        res.locals.pruebasBoolean = true;
        next();
    });
}

// Use React app
const path = require('path');
if (dev_environment) {
    app.use(normalize(contextPath1), express.static(path.resolve(__dirname, './client/build')));
}
else {
    app.use(normalize(contextPath1), express.static(path.join(__dirname, 'client/build')));
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
const routingStart = normalize(contextPath1) + '/api';
app.use(routingStart, sections_routes);
app.use(routingStart, documents_routes);

// Export
module.exports = app;