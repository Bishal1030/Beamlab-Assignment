const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Admin} = require('../../models')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../../.env')});





const Login = async(email, password) => {

    const admin = await Admin.findOne({where: {email:email}})

    if(!admin){
        throw new Error("admin not found")
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(isMatch){
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:"24h"})
        return token;
    }
    throw new Error("incorrect password")
}

module.exports = {Login}