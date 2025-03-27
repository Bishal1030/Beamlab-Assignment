const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, userRole } = require('../../models');
const { Login } = require('../../services/user/auth.service.js');
const {describe, expect, afterEach, test} = require('@jest/globals')
const users = require('../fixtures/users.json')

jest.mock('../../models')
jest.mock('bcrypt');
jest.mock('jsonwebtoken');


describe('Login function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    test("should throw error when user is not found", async () => {
        User.findOne.mockResolvedValue(null);

        await expect(Login(users.email, users.password))
            .rejects.toThrow("user not found");
    })

    test("should throw validation error when password is wrong", async () => {

        User.findOne.mockResolvedValue({
            id: 1,
            email: users.email,
            password: users.password
        });

        bcrypt.compare.mockResolvedValue(false); 

        await expect(Login(users.email, users.password))
            .rejects.toThrow("incorrect password"); 
    });
        
    test("should throw validation error when role property is missing in userRole", async () => {
        // Simulate a found user with correct password
        User.findOne.mockResolvedValue({
          id: 1,
          email: users.email,
          password: users.password
        });
        bcrypt.compare.mockResolvedValue(true);
        // Simulate a role record without a role property
        userRole.findOne.mockResolvedValue({
          userId: 1,
          // missing 'role' property
        });
    
        await expect(Login(users.email, users.password))
          .rejects.toThrow("Sorry! Can't find any roles");
      });
    
      test("should return token and role on valid login", async () => {
        const dummyToken = "dummyToken";
        const dummyRole = users.role;
    
        // Simulate a found user with correct password
        User.findOne.mockResolvedValue({
          id: 1,
          email: users.email,
          password: users.password
        });
        bcrypt.compare.mockResolvedValue(true);
        // Simulate a valid userRole record with a role property containing roleName
        userRole.findOne.mockResolvedValue({
          userId: 1,
          role: { roleName: dummyRole }
        });
        // Simulate jwt sign to return a dummy token
        jwt.sign.mockReturnValue(dummyToken);
    
        const result = await Login(users.email, users.password);
    
        expect(result).toEqual({ token: dummyToken, role: dummyRole });
        expect(jwt.sign).toHaveBeenCalledWith(
          { email: users.email, role: dummyRole },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
      });
    });



