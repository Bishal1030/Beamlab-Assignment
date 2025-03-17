const authService = require('../services/user/auth.service.js')

const userLogin = async(req,res) => {
    try {
        const {email,password} = req.body;

    const {token, role} = await authService.Login(email, password);
    
    if(!token){
        return res.status(404).json({message: "unauthorized access"})
    }

    res.status(201).json({message: `successfully logged in ${role}`, data: {token,role}})
    } catch(err){
        console.log(err)
        res.status(500).json({message: "you are not verified", data: null})
    }
}


module.exports = {userLogin};