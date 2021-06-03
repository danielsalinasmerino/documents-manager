'use strict';

var Document = require('../models/document');

var controller = {

    test: function(req, res){
        return res.status(200).send({
            message: "Test from Document Controller working fine!"
        });
    },

    createDocument: function(req, res){
        const params = req.body;

        var document = new Document();
        document.idDocument = params.idDocument;
        document.title = params.title;
        document.documentUrl = params.documentUrl;
        document.createdAt = params.createdAt;
        document.updatedAt = params.updatedAt;
        document.sectionID = params.sectionID;
        document.onlyURL = params.onlyURL;
        document.originalDocumentName = params.originalDocumentName;

        document.save((err, documentStored) => {
            if(err) return res.status(500).send({message: "Error on Create Document."});
            if(!documentStored) return res.status(404).send({message: "It was not possible to Create the Document."});

            return res.status(200).send(documentStored);
        });
    },

    readDocuments: function(req, res){
        Document.find({}).exec((err, documents) => {
            if(err) return res.status(500).send({message: "Error on Read Documents."});
            if(!documents) return res.status(404).send({message: "It was not possible to Read the Documents."});

            return res.status(200).send(documents);
        });
    },

    readDocumentById: function(req, res){
        const idDocument = req.params.idDocument;
        const query = Document.where({idDocument: idDocument});
        query.findOne((err, documentFound) => {
            if(err) return res.status(500).send({message: "Error on Read Document by ID."});
            if(!documentFound) return res.status(404).send({message: "Document not found."});
            if(documentFound) return res.status(200).send(documentFound);
        });
    },

    updateDocumentById: function(req, res){
        const documentUpdatedBody = req.body;
        const idDocument = req.params.idDocument;
        const query = Document.where({idDocument: idDocument});
        query.findOne((err, documentFound) => {
            if(err) return res.status(500).send({message: "Error on Update Document by ID."});
            if(!documentFound) return res.status(404).send({message: "Document to Update not found."});
            if(documentFound){
                Document.findByIdAndUpdate(documentFound.id, documentUpdatedBody, {new: true}, (err, documentUpdated) => {
                    if(err) return res.status(500).send({message: "Error on Update Document by ID."});
                    if(!documentUpdated) return res.status(404).send({message: "It was not possible to Update the Document."});
        
                    return res.status(200).send(documentUpdated);
                });
            }
        });
    },

    deleteDocumentById: function(req, res){
        const idDocument = req.params.idDocument;
        const query = Document.where({idDocument: idDocument});
        query.findOne((err, documentFound) => {
            if(err) return res.status(500).send({message: "Error on Delete Document by ID."});
            if(!documentFound) return res.status(404).send({message: "Document to Delete not found."});
            if(documentFound){
                Document.findByIdAndDelete(documentFound.id, (err, documentDeleted) => {
                    if(err) return res.status(500).send({message: "Error on Delete Document by ID."});
                    if(!documentDeleted) return res.status(404).send({message: "It was not possible to Delete the Document."});
        
                    return res.status(200).send({message: "Document deleted"});
                });
            }
        });
    },

    deleteDocuments: function(req, res){
        Document.deleteMany({}).then(() => {
            return res.status(200).send({ message: "All documents deleted" });
        });
    },

    /*  uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar el proyecto.'});
                if(!projectUpdated) return res.status(404).send({message: 'No se pudo actualizar el proyectos.'});
    
                return res.status(200).send({project: projectUpdated});
            });
        }
    }, */

};

module.exports = controller;