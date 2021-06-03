'use strict';

var express = require('express');
var DocumentController = require('../controllers/document');

var router = express.Router();

const urlStart = "/documents";

// Test
router.get((urlStart + '/test'), DocumentController.test);
// CRUD
router.post(urlStart, DocumentController.createDocument);
router.get(urlStart, DocumentController.readDocuments);
router.get((urlStart + '/:idDocument'), DocumentController.readDocumentById);
router.put((urlStart + '/:idDocument'), DocumentController.updateDocumentById);
router.delete((urlStart + '/delete/:idDocument'), DocumentController.deleteDocumentById);
router.delete((urlStart + '/deleteAll'), DocumentController.deleteDocuments); 

module.exports = router;