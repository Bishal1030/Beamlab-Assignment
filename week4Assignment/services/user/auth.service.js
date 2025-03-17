const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Role,userRole} = require('../../models')
const path = require('path')

const dotenv = require('dotenv')
const { ValidationError } = require('../../middleware/validationError')
dotenv.config({path: path.resolve(__dirname, '../../../.env')});

const Login = async(email, password) => {
    const user = await User.findOne({where: {email:email}})
    if(!user){
        throw new Error("user not found")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new ValidationError("incorrect password", 403)
    }
    // fetching user role 
    const roleOfUser = await userRole.findOne({
        where: { userId: user.id },
        include: [{ model: Role, as: "role" }] 
    });



    if (!roleOfUser || !roleOfUser.role) {
        console.log("Debug: roleOfUser is", roleOfUser);
        throw new ValidationError("Sorry! Can't find any roles");
    }

    const role = await roleOfUser.role.roleName  // it's either admin or user (goes inside Role model)

    const token = jwt.sign({email, role: role}, process.env.JWT_SECRET, {expiresIn:"24h"})
        return {token, role: role}
}

module.exports = {Login}