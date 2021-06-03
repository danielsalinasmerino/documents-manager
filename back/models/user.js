'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    idUser: String,
    email: String,
    role: String,
});

module.exports = mongoose.model('User', UserSchema);