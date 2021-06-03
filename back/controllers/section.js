'use strict';

var Section = require('../models/section');

var controller = {

    test: function(req, res){
        return res.status(200).send({ message: "Test from Section Controller working fine!" });
    },

    createSection: function(req, res){
        const params = req.body;

        var section = new Section();
        section.idSection = params.idSection;
        section.title = params.title;
        section.description = params.description;
        section.createdAt = params.createdAt;
        section.updatedAt = params.updatedAt;
        section.position = params.position;
        section.parentID = params.parentID;
        section.portalID = params.portalID;

        section.save((err, sectionStored) => {
            if(err) return res.status(500).send({message: "Error on Create Section."});
            if(!sectionStored) return res.status(404).send({message: "It was not possible to Create the Section."});

            return res.status(200).send(sectionStored);
        });
    },

    readSections: function(req, res){
        Section.find({}).exec((err, sections) => {
            if(err) return res.status(500).send({message: "Error on Read Sections."});
            if(!sections) return res.status(404).send({message: "It was not possible to Read the Sections."});

            return res.status(200).send(sections);
        });
    },

    readSectionsPas: function(req, res){
        Section.find({}).exec((err, sections) => {
            if(err) return res.status(500).send({message: "Error on Read Sections PAS."});
            if(!sections) return res.status(404).send({message: "It was not possible to Read the Sections PAS."});

            const sectionsPas = sections.filter(section => section.portalID === 'pas');

            return res.status(200).send(sectionsPas);
        });
    },

    readSectionsPdi: function(req, res){
        Section.find({}).exec((err, sections) => {
            if(err) return res.status(500).send({message: "Error on Read Sections PDI."});
            if(!sections) return res.status(404).send({message: "It was not possible to Read the Sections PDI."});

            const sectionsPdi = sections.filter(section => section.portalID === 'pdi');

            return res.status(200).send(sectionsPdi);
        });
    },

    readSectionsEstudiantes: function(req, res){
        Section.find({}).exec((err, sections) => {
            if(err) return res.status(500).send({message: "Error on Read Sections Estudiantes."});
            if(!sections) return res.status(404).send({message: "It was not possible to Read the Sections Estudiantes."});

            const sectionsEstudiantes = sections.filter(section => section.portalID === 'estudiantes');

            return res.status(200).send(sectionsEstudiantes);
        });
    },

    readSectionById: function(req, res){
        const idSection = req.params.idSection;
        const query = Section.where({idSection: idSection});
        query.findOne((err, sectionFound) => {
            if(err) return res.status(500).send({message: "Error on Read Section by ID."});
            if(!sectionFound) return res.status(404).send({message: "Section not found."});
            if(sectionFound) return res.status(200).send(sectionFound);
        });
    },

    updateSectionById: function(req, res){
        const sectionUpdatedBody = req.body;
        const idSection = req.params.idSection;
        const query = Section.where({idSection: idSection});
        query.findOne((err, sectionFound) => {
            if(err) return res.status(500).send({message: "Error on Update Section by ID."});
            if(!sectionFound) return res.status(404).send({message: "Section to Update not found."});
            if(sectionFound){
                Section.findByIdAndUpdate(sectionFound.id, sectionUpdatedBody, {new: true}, (err, sectionUpdated) => {
                    if(err) return res.status(500).send({message: "Error on Update Section by ID."});
                    if(!sectionUpdated) return res.status(404).send({message: "It was not possible to Update the Section."});
        
                    return res.status(200).send(sectionUpdated);
                });
            }
        });
    },

    deleteSectionById: function(req, res){
        const idSection = req.params.idSection;
        const query = Section.where({idSection: idSection});
        query.findOne((err, sectionFound) => {
            if(err) return res.status(500).send({message: "Error on Delete Section by ID."});
            if(!sectionFound) return res.status(404).send({message: "Section to Delete not found."});
            if(sectionFound){
                Section.findByIdAndDelete(sectionFound.id, (err, sectionDeleted) => {
                    if(err) return res.status(500).send({message: "Error on Delete Section by ID."});
                    if(!sectionDeleted) return res.status(404).send({message: "It was not possible to Delete the Section."});
        
                    return res.status(200).send({message: "Section deleted"});
                });
            }
        });
    },

    deleteSections: function(req, res){
        Section.deleteMany({}).then(() => {
            return res.status(200).send({ message: "All sections deleted" });
        });
    },

};

module.exports = controller;