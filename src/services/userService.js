const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = 'my_secret_key'; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserService {

    static async signUp(username, password) {
        try {
            // Hash the password with 10 salt rounds
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create the new user in the database
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            return newUser;
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error creating user:', error);
            
            // Rethrow the original error message
            throw new Error(error.message);
        }
    }
    

    static async signIn(username, password) {
        try {
            
            const user = await prisma.user.findUnique({
                where: { username },
            });

            
            if (!user) {
                throw new Error('Invalid credentials');
            }

           
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            return { token, userId: user.id };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
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


    static async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new Error('Error getting all users');
        }
    }


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
