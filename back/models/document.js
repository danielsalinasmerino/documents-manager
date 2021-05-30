'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = Schema({
    idDocument: String,
    title: String,
    documentUrl: String,
    createdAt: String,
    updatedAt: String,
    sectionID: String,
    onlyURL: Boolean,
    originalDocumentName: String,
});

module.exports = mongoose.model('Document', DocumentSchema);