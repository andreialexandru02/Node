const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateCreateOrEditPost = async (req, res, next) => {
    const { title, content, userId } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required and must be a non-empty string.' });
    }


    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: `User with ID ${userId} does not exist.` });
    }

    next();
};


const validateGetOrDeletePost = async (req, res, next) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id, 10) } });

    if (!post) {
        return res.status(404).json({ error: `Post with ID ${id} does not exist.` });
    }

    next();
};

module.exports = {
    validateCreateOrEditPost,
    validateGetOrDeletePost,
};
