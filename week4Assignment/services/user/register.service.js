const {User, Role, userRole} = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('../../middleware/validationError')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../../.env')});


const registerUser = async(name,email,password) => {
    const user = await User.findOne({where : {email:email}})

    if(!user){
        const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser =  await User.create({
        name,
        email,
        password: hashedPassword
    })

    const userRoleEntry = await Role.findOne({where: {roleName: "User"}})
    if(!userRoleEntry){
        userRoleEntry = await Role.create({roleName: "User"})
    }

    console.log("roleId:",userRoleEntry.id)

    await userRole.create({
        userId: newUser.id,
        roleId: userRoleEntry.id
    })

    const token = jwt.sign({
        id: newUser.id,
        role: "User"
    }, process.env.JWT_SECRET, {expiresIn: "1h"})
    
    
    return {token, role: "User"};

    }
    throw new ValidationError("User already exists")
    

    
}

module.exports = {registerUser}