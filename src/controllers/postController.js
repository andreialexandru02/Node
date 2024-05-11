const PostService = require('../services/postService');

class PostController {
    static async createPost(req, res) {
        const { content, title ,userId } = req.body;
        try {
            const newPost = await PostService.createPost(title, content, userId);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPostById(req, res) {
        const { id } = req.params;
        try {
            const post = await PostService.getPostById(parseInt(id, 10));
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllPosts(req, res) {
        try {
            const posts = await PostService.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async updatePost(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedPost = await PostService.updatePost(parseInt(id, 10), data);
            if (updatedPost) {
                res.json(updatedPost);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

  
    static async deletePost(req, res) {
        const { id } = req.params;
        try {
            const deletedPost = await PostService.deletePost(parseInt(id, 10));
            if (deletedPost) {
                res.json({ message: 'Post deleted' });
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
   
    static async getAllPostsPagination(req, res) {
        const { page = 1, limit = 3 } = req.body;
        const offset = (page - 1) * limit;
        const parsedLimit  = parseInt(limit)
        try {
            const posts = await PostService.getAllPostsPagination({ offset, parsedLimit });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getAllPostsAlphabetically(req, res) {
        try {
            const posts = await PostService.getAllPostsAlphabetically();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getPostsWithComments(req, res) {
        try {
            const posts = await PostService.getPostsWithComments();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PostController;
