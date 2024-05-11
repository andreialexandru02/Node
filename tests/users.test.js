const UserController = require('../src/controllers/userController');
const UserService = require('../src/Services/userService');


jest.mock('../src/Services/userService');

describe('Teste unitare pentru UserController', () => {
    
    let req;
    let res;
    let next;

  
    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    test('signUp', async () => {
        req.body = {
            username: 'testuser',
            password: 'password123'
        };

        const newUser = { id: 1, username: 'testuser' };

       
        UserService.signUp.mockResolvedValue(newUser);

        
        await UserController.signUp(req, res, next);

       
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newUser);
    });

    test('signIn', async () => {
        req.body = {
            username: 'testuser',
            password: 'password123'
        };

        const signInResult = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTcxNDkzMDQwOSwiZXhwIjoxNzE0OTM0MDA5fQ.aarhOzjGavygXNA2C4MkcaCHm0vxj_Mp6tdZvIySV_0',
            userId: 100
        };

   
        UserService.signIn.mockResolvedValue(signInResult);

        await UserController.signIn(req, res, next);


        expect(res.json).toHaveBeenCalledWith(signInResult);
    });

    test('getUserById', async () => {
        req.params.id = '1';
        const user = { id: 1, username: 'testuser' };

    
        UserService.getUserById.mockResolvedValue(user);

    
        await UserController.getUserById(req, res, next);

        
        expect(res.json).toHaveBeenCalledWith(user);
    });
    test('updateUser', async () => {
        req.params.id = '1';
        req.body = {
            username: 'updateduser'
        };
        const updatedUser = { id: 1, username: 'updateduser' };
    
        
        UserService.updateUser.mockResolvedValue(updatedUser);
    
     
        await UserController.updateUser(req, res, next);
    
      
        expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
    
    test('deleteUser', async () => {
        req.params.id = '1';
        const deletedUser = { message: 'User deleted' };
    

        UserService.deleteUser.mockResolvedValue(true);
    
        
        await UserController.deleteUser(req, res, next);
    
     
        expect(res.json).toHaveBeenCalledWith(deletedUser);
    });
    

    
});
