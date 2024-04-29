const express = require('express');
const CommentController = require('../controllers/commentController');

const router = express.Router();

// Define routes and map them to CommentController functions

// Create a new comment (POST /comments)
router.post('/', CommentController.createComment);

// Get a comment by ID (GET /comments/:id)
router.get('/:id', CommentController.getCommentById);

// Get all comments (GET /comments)
router.get('/', CommentController.getAllComments);

// Update a comment by ID (PUT /comments/:id)
router.put('/:id', CommentController.updateComment);

// Delete a comment by ID (DELETE /comments/:id)
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
