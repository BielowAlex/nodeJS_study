const User = require('../db/User');
const {userServices} = require("../services");

module.exports = {

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.status(201).json(users);
        } catch (e) {
            res.status(400).json(e.message || 'Unknown Error!');
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = req.user;
            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const newUser = await userServices.create(user);

            res.status(201).json(newUser);
        } catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            const newUser = await userServices.update({_id:id},req.body);

            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            await userServices.findByIdAndDelete({_id: id});

            res.status(201).json("User was deleted");
        } catch (e) {
            res.status(404).json(e.message || 'Unknown error!');
        }
    }

}