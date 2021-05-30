'use strict';

// Required modules
var express = require("express");

// We create our App
var app = express();

// Routing Files
const sections_routes = require('./routes/section');
const documents_routes = require('./routes/document');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routing
const routingStart = '/api';
app.use(routingStart, sections_routes);
app.use(routingStart, documents_routes);

// Export
module.exports = app;