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
router.get((urlStart + '/:idSection'), SectionController.readSectionById);
router.put((urlStart + '/:idSection'), SectionController.updateSectionById);
router.delete((urlStart + '/:idSection'), SectionController.deleteSectionById); 

module.exports = router;