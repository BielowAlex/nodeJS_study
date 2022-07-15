const userRouter = require('express').Router();

const userController = require('../controllers/user_controller');
const {userMiddleware, commonMiddleware} = require("../middlewares");

userRouter.get('/',userController.getAllUsers);
userRouter.post('/',userMiddleware.checkUserOnCreate,userController.createUser);
userRouter.get('/:id',commonMiddleware.isValidID,userMiddleware.isUserPresent,userController.getUserById);
userRouter.put('/:id',commonMiddleware.isValidID,userMiddleware.isUserPresent,userController.updateUser);
userRouter.delete('/:id',commonMiddleware.isValidID,userMiddleware.isUserPresent,userController.deleteUser);

module.exports = {
    userRouter
}