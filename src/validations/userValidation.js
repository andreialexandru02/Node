const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const validateCreateOrEditUser = async (req, res, next) => {
    const { username, password } = req.body;
    
    if (!username || typeof username !== 'string' || !/^[A-Z]/.test(username)) {
        return res.status(400).json({ error: 'Username is required and must start with a capital letter.' });
    }
    
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password is required and must be at least 6 characters long.' });
    }
    if (req.method === 'POST') {
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: `User with username "${username}" already exists.` });
        }
    }

    next();
};

const validateGetOrDeleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id, 10) } });

    if (!user) {
        return res.status(404).json({ error: `User with ID ${id} does not exist.` });
    }

    next();
};

module.exports = {
    validateCreateOrEditUser,
    validateGetOrDeleteUser,
};
