'use strict';

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

const urlStart = "/users";

// Test
router.get((urlStart + '/test'), UserController.test);
// CRUD
router.post(urlStart, UserController.createUser);
router.get(urlStart, UserController.readUsers);
router.get((urlStart + '/:idUser'), UserController.readUserById);
router.put((urlStart + '/:idUser'), UserController.updateUserById);
router.delete((urlStart + '/delete/:idUser'), UserController.deleteUserById);
router.delete((urlStart + '/deleteAll'), UserController.deleteUsers); 

module.exports = router;