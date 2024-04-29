const express = require('express');
const PostController = require('../controllers/postController');

const router = express.Router();

// Define routes and map them to PostController functions

// Create a new post (POST /posts)
router.post('/', PostController.createPost);

// Get a post by ID (GET /posts/:id)
router.get('/:id', PostController.getPostById);

// Get all posts (GET /posts)
router.get('/', PostController.getAllPosts);

// Update a post by ID (PUT /posts/:id)
router.put('/:id', PostController.updatePost);

// Delete a post by ID (DELETE /posts/:id)
router.delete('/:id', PostController.deletePost);

module.exports = router;
