const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Define routes and map them to UserController functions

// Create a new user (POST /users)
router.post('/', UserController.createUser);

// Get a user by ID (GET /users/:id)
router.get('/:id', UserController.getUserById);

// Get all users (GET /users)
router.get('/', UserController.getAllUsers);

// Update a user by ID (PUT /users/:id)
router.put('/:id', UserController.updateUser);

// Delete a user by ID (DELETE /users/:id)
router.delete('/:id', UserController.deleteUser);

module.exports = router;
