'use strict';

var User = require('../models/user');

var controller = {

    test: function(req, res){
        return res.status(200).send({ message: "Test from User Controller working fine!" });
    },

    createUser: function(req, res){
        const params = req.body;

        var user = new User();
        user.idUser = params.idUser;
        user.email = params.email;
        user.role = params.role;

        user.save((err, userStored) => {
            if(err) return res.status(500).send({message: "Error on Create User."});
            if(!userStored) return res.status(404).send({message: "It was not possible to Create the User."});

            return res.status(200).send(userStored);
        });
    },

    readUsers: function(req, res){
        User.find({}).exec((err, users) => {
            if(err) return res.status(500).send({message: "Error on Read Users."});
            if(!users) return res.status(404).send({message: "It was not possible to Read the Users."});

            return res.status(200).send(users);
        });
    },

    readUserById: function(req, res){
        const idUser = req.params.idUser;
        const query = User.where({idUser: idUser});
        query.findOne((err, userFound) => {
            if(err) return res.status(500).send({message: "Error on Read User by ID."});
            if(!userFound) return res.status(404).send({message: "User not found."});
            if(userFound) return res.status(200).send(userFound);
        });
    },

    updateUserById: function(req, res){
        const userUpdatedBody = req.body;
        const idUser = req.params.idUser;
        const query = User.where({idUser: idUser});
        query.findOne((err, userFound) => {
            if(err) return res.status(500).send({message: "Error on Update User by ID."});
            if(!userFound) return res.status(404).send({message: "User to Update not found."});
            if(userFound){
                User.findByIdAndUpdate(userFound.id, userUpdatedBody, {new: true}, (err, userUpdated) => {
                    if(err) return res.status(500).send({message: "Error on Update User by ID."});
                    if(!userUpdated) return res.status(404).send({message: "It was not possible to Update the User."});
        
                    return res.status(200).send(userUpdated);
                });
            }
        });
    },

    deleteUserById: function(req, res){
        const isUser = req.params.isUser;
        const query = User.where({isUser: isUser});
        query.findOne((err, userFound) => {
            if(err) return res.status(500).send({message: "Error on Delete User by ID."});
            if(!userFound) return res.status(404).send({message: "User to Delete not found."});
            if(userFound){
                User.findByIdAndDelete(userFound.id, (err, userDeleted) => {
                    if(err) return res.status(500).send({message: "Error on Delete User by ID."});
                    if(!userDeleted) return res.status(404).send({message: "It was not possible to Delete the User."});
        
                    return res.status(200).send({message: "User deleted"});
                });
            }
        });
    },

    deleteUsers: function(req, res){
        User.deleteMany({}).then(() => {
            return res.status(200).send({ message: "All users deleted" });
        });
    },

};

module.exports = controller;