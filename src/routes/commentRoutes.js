const express = require('express');
const CommentController = require('../controllers/commentController');
const { validateCreateOrEditComment, validateGetOrDeleteComment } = require('../validations/commentValidation');
const authenticateJWT = require('../utils/authenticateJWT');

const commentRouter = express.Router();

commentRouter.post('/', validateCreateOrEditComment, CommentController.createComment);
commentRouter.get('/:id', validateGetOrDeleteComment, CommentController.getCommentById);
commentRouter.put('/:id', authenticateJWT, validateCreateOrEditComment, CommentController.updateComment);
commentRouter.delete('/:id', authenticateJWT, validateGetOrDeleteComment, CommentController.deleteComment);

module.exports = commentRouter;
