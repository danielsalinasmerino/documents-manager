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

// Required models
var Section = require('./models/section');
var Document = require('./models/document');
var User = require('./models/user');

// MOCK data
const mockSections = require('./helpers/resources/mockSections');
const mockDocuments = require('./helpers/resources/mockDocuments');
const mockUsers = require('./helpers/resources/mockUsers');

function createNewSectionWithMockData(data){
    var section = new Section();
    section.idSection = data.idSection;
    section.title = data.title;
    section.description = data.description;
    section.createdAt = data.createdAt;
    section.updatedAt = data.updatedAt;
    section.position = data.position;
    section.parentID = data.parentID;
    section.portalID = data.portalID;
    return section;
}

function createNewDocumentWithMockData(data){
    var document = new Document();
    document.idDocument = data.idDocument;
    document.title = data.title;
    document.documentUrl = data.documentUrl;
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    document.sectionID = data.sectionID;
    document.onlyURL = data.onlyURL;
    document.originalDocumentName = data.originalDocumentName;
    return document;
}

function createNewUserWithMockData(data){
    var user = new User();
    user.idUser = data.idUser;
    user.email = data.email;
    user.role = data.role;
    return user;
}

mongoose.Promise = global.Promise;
mongoose.connect(connectionDB)
        .then(() => {
            app.listen(port, () => {
                functions.logWithFormat("POPULATE START");
                // Sections populate
                Section.deleteMany({}).then(() => {
                    functions.logWithFormat("Deleted all Sections");
                    for(let i = 0; i < mockSections.length; i++){
                        var section = createNewSectionWithMockData(mockSections[i]);
                        section.save((err, sectionStored) => { 
                            functions.logWithFormat("Created Section with title: " + mockSections[i].title);
                        });
                    }
                    // Documents populate
                    Document.deleteMany({}).then(() => {
                        functions.logWithFormat("Deleted all Documents");
                        for(let i = 0; i < mockDocuments.length; i++){
                            var document = createNewDocumentWithMockData(mockDocuments[i]);
                            document.save((err, documentStored) => { 
                                functions.logWithFormat("Created Document with title: " + mockDocuments[i].title);
                            });
                        }
                        // Users populate
                        User.deleteMany({}).then(() => {
                            functions.logWithFormat("Deleted all Users");
                            for(let i = 0; i < mockUsers.length; i++){
                                var user = createNewUserWithMockData(mockUsers[i]);
                                user.save((err, userStored) => { 
                                    functions.logWithFormat("Created User with email: " + mockUsers[i].email);
                                });
                            }
                        });
                    });
                });
            });
        })
        .catch((error) => {
            functions.logWithFormat(error);
        });