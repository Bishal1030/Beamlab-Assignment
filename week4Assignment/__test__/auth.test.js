const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, userRole } = require('../models');
const { Login } = require('../services/admin/auth.service.js');
const { ValidationError } = require('../middleware/validationError.js');
const {describe, expect, afterEach, test} = require('@jest/globals')
const users = require('./fixtures/users.json')

jest.mock('../models')
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
  });



