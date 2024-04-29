const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommentService {
    // Create a new comment
    static async createComment(content, userId, postId) {
        try {
            const newComment = await prisma.comment.create({
                data: {
                    content,
                    userId,
                    postId,
                },
            });
            return newComment;
        } catch (error) {
            throw new Error('Error creating comment');
        }
    }

    // Get a comment by ID
    static async getCommentById(id) {
        try {
            const comment = await prisma.comment.findUnique({
                where: { id },
                include: {
                    user: true, // Include related user
                    post: true, // Include related post
                },
            });
            return comment;
        } catch (error) {
            throw new Error('Error getting comment by ID');
        }
    }

    // Get all comments
    static async getAllComments() {
        try {
            const comments = await prisma.comment.findMany({
                include: {
                    user: true, // Include related user
                    post: true, // Include related post
                },
            });
            return comments;
        } catch (error) {
            throw new Error('Error getting all comments');
        }
    }

    // Update a comment by ID
    static async updateComment(id, data) {
        try {
            const updatedComment = await prisma.comment.update({
                where: { id },
                data,
            });
            return updatedComment;
        } catch (error) {
            throw new Error('Error updating comment');
        }
    }

    // Delete a comment by ID
    static async deleteComment(id) {
        try {
            const deletedComment = await prisma.comment.delete({
                where: { id },
            });
            return deletedComment;
        } catch (error) {
            throw new Error('Error deleting comment');
        }
    }
}

module.exports = CommentService;
