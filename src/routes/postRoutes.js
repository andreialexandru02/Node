const express = require('express');
const PostController = require('../controllers/postController');
const { validateCreateOrEditPost, validateGetOrDeletePost } = require('../validations/postValidation');
const authenticateJWT = require('../utils/authenticateJWT');

const postRouter = express.Router();

postRouter.post('/', validateCreateOrEditPost, PostController.createPost);
postRouter.get('/:id', validateGetOrDeletePost, PostController.getPostById);
postRouter.put('/:id', authenticateJWT,validateCreateOrEditPost, PostController.updatePost);
postRouter.delete('/:id', authenticateJWT, validateGetOrDeletePost, PostController.deletePost);

module.exports = postRouter;
