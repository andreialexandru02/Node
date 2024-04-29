const CommentService = require('../services/commentService');

class CommentController {
    // Handle creating a new comment
    static async createComment(req, res) {
        const { content, userId, postId } = req.body;
        try {
            const newComment = await CommentService.createComment(content, userId, postId);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Handle getting a comment by ID
    static async getCommentById(req, res) {
        const { id } = req.params;
        try {
            const comment = await CommentService.getCommentById(parseInt(id, 10));
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({ error: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Handle getting all comments
    static async getAllComments(req, res) {
        try {
            const comments = await CommentService.getAllComments();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Handle updating a comment by ID
    static async updateComment(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedComment = await CommentService.updateComment(parseInt(id, 10), data);
            if (updatedComment) {
                res.json(updatedComment);
            } else {
                res.status(404).json({ error: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Handle deleting a comment by ID
    static async deleteComment(req, res) {
        const { id } = req.params;
        try {
            const deletedComment = await CommentService.deleteComment(parseInt(id, 10));
            if (deletedComment) {
                res.json({ message: 'Comment deleted' });
            } else {
                res.status(404).json({ error: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CommentController;
