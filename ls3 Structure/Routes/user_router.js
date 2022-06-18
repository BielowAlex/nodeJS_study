const userRouter = require('express').Router();

const userController = require('../controllers/user_controller');

userRouter.get('/',userController.getAllUsers);
userRouter.post('/',userController.postUser);
userRouter.get('/:userId',userController.getUserById);
userRouter.put('/:userId',userController.updateUser);
userRouter.delete('/:userId',userController.deleteUser);

module.exports = {
    userRouter
}