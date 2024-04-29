const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const validateCreateOrEditComment = async (req, res, next) => {
    const { content, userId, postId } = req.body;


    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required and must be a non-empty string.' });
    }


    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: `User with ID ${userId} does not exist.` });
    }


    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
        return res.status(404).json({ error: `Post with ID ${postId} does not exist.` });
    }

    next();
};


const validateGetOrDeleteComment = async (req, res, next) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id, 10) } });

    if (!comment) {
        return res.status(404).json({ error: `Comment with ID ${id} does not exist.` });
    }

    next();
};

module.exports = {
    validateCreateOrEditComment,
    validateGetOrDeleteComment,
};
