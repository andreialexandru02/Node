const express = require('express');
const PostController = require('../controllers/postController');
const { validateCreateOrEditPost, validateGetOrDeletePost } = require('../validations/postValidation');
const authenticateJWT = require('../utils/authenticateJWT');
const logger = require('../utils/logger');

const postRouter = express.Router();

postRouter.post('/', validateCreateOrEditPost, PostController.createPost);
postRouter.get('/', PostController.getAllPosts);
postRouter.get('/pagination', PostController.getAllPostsPagination);
postRouter.get('/alphabetically' ,PostController.getAllPostsAlphabetically);
postRouter.get('/postsWithCommnets', PostController.getPostsWithComments);
postRouter.get('/:id', validateGetOrDeletePost, PostController.getPostById);
postRouter.put('/:id', authenticateJWT,validateCreateOrEditPost, PostController.updatePost);
postRouter.delete('/:id', authenticateJWT, validateGetOrDeletePost, PostController.deletePost);

module.exports = postRouter;
