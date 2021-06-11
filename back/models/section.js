'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SectionSchema = Schema({
    idSection: String,
    title: String,
    description: String,
    createdAt: String,
    updatedAt: String,
    position: Number,
    parentID: String,
    portalID: String,
    documentsFormat: String
});

module.exports = mongoose.model('Section', SectionSchema);