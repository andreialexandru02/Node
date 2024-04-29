const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
    // Create a new user
    static async createUser(username, password) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            });
            return newUser;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    // Get a user by ID
    static async getUserById(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            return user;
        } catch (error) {
            throw new Error('Error getting user by ID');
        }
    }

    // Get all users
    static async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new Error('Error getting all users');
        }
    }

    // Update a user by ID
    static async updateUser(id, data) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data,
            });
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    // Delete a user by ID
    static async deleteUser(id) {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id },
            });
            return deletedUser;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}

module.exports = UserService;
