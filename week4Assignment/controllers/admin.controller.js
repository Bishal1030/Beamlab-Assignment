const adminService = require('../services/admin/auth.service.js')

const adminLogin = async(req,res) => {
    const {email,password} = req.body;

    const token = await adminService.Login(email, password);
    
    if(!token){
        return res.status(404).json({message: "unauthorized access"})
    }

    res.status(201).json({message: "successfully logged in", data: token})
}


module.exports = {adminLogin};