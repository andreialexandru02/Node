const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PostService {
    // Create a new post
    static async createPost(title, content, userId) {
        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId,
                },
            });
            return newPost;
        } catch (error) {
            throw new Error('Error creating post');
        }
    }

    // Get a post by ID
    static async getPostById(id) {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    comments: true, // Include related comments
                },
            });
            return post;
        } catch (error) {
            throw new Error('Error getting post by ID');
        }
    }

    // Get all posts
    static async getAllPosts() {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    comments: true, // Include related comments
                },
            });
            return posts;
        } catch (error) {
            throw new Error('Error getting all posts');
        }
    }

    // Update a post by ID
    static async updatePost(id, data) {
        try {
            const updatedPost = await prisma.post.update({
                where: { id },
                data,
            });
            return updatedPost;
        } catch (error) {
            throw new Error('Error updating post');
        }
    }

    static async deletePost(id) {
        try {
            const deletedPost = await prisma.post.delete({
                where: { id },
            });
            return deletedPost;
        } catch (error) {
            throw new Error('Error deleting post');
        }
    }
    static async getAllPostsPagination({ offset, parsedLimit }) {
        try {
            const posts = await prisma.post.findMany({
                skip: offset,
                take: parsedLimit,
            });
            return posts;
        } catch (error) {
            throw new Error('Error getting paginated posts');
        }
    }
    static async getAllPostsAlphabetically() {
        try {
            const posts = await this.getAllPosts();

            return posts.sort((a, b) => a.title.localeCompare(b.title));
        } catch (error) {
            throw new Error('Error getting all posts aphabetically');
        }
    }
    static async getPostsWithComments() {
        try {
            const posts = await this.getAllPosts();

            return posts.filter(post => post.comments && post.comments.length > 0);
        } catch (error) {
            throw new Error('Error getting  posts with commnets');
        }
    }
    
}
module.exports = PostService;
