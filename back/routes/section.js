'use strict';

var express = require('express');
var SectionController = require('../controllers/section');

var router = express.Router();

const urlStart = "/sections";

// Test
router.get((urlStart + '/test'), SectionController.test);
// CRUD
router.post(urlStart, SectionController.createSection);
router.get(urlStart, SectionController.readSections);
router.get((urlStart + '/pas'), SectionController.readSectionsPas);
router.get((urlStart + '/pdi'), SectionController.readSectionsPdi);
router.get((urlStart + '/estudiantes'), SectionController.readSectionsEstudiantes);
router.get((urlStart + '/:idSection'), SectionController.readSectionById);
router.put((urlStart + '/:idSection'), SectionController.updateSectionById);
router.delete((urlStart + '/deleteAll'), SectionController.deleteSections); 

module.exports = router;