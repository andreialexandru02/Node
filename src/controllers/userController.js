const UserService = require('../Services/userService');

class UserController {
    
    static async signUp(req, res) {
        const { username, password } = req.body;
        try {
            const newUser = await UserService.signUp(username, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async signIn(req, res) {
        const { username, password } = req.body;
        try {
            const { token, userId } = await UserService.signIn(username, password);
            res.json({ token, userId });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
  
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(parseInt(id, 10));
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedUser = await UserService.updateUser(parseInt(id, 10), data);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UserService.deleteUser(parseInt(id, 10));
            if (deletedUser) {
                res.json({ message: 'User deleted' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
