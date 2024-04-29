const express = require('express');
const UserController = require('../controllers/userController');
const { validateCreateOrEditUser, validateGetOrDeleteUser } = require('../validations/userValidation');
const authenticateJWT = require('../utils/authenticateJWT');

const userRouter = express.Router();
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', validateGetOrDeleteUser, UserController.getUserById);
userRouter.put('/:id', authenticateJWT, validateCreateOrEditUser, UserController.updateUser);
userRouter.delete('/:id', authenticateJWT, validateGetOrDeleteUser, UserController.deleteUser);
userRouter.post('/signup', UserController.signUp);
userRouter.post('/signin', UserController.signIn)
module.exports = userRouter;
