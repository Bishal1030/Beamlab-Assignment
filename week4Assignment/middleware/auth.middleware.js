const jwt = require('jsonwebtoken')

const authenticate = ((req,res,next) => {
    let token;
    if (!req.headers.authorization) {
      throw new Error("Token not provided", 400);
    }
      
      


    try {
      if (req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(" ")[1];
      }
        
       if(!token){
            return res.status(403).json({message: "token not available"})
          }
    
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded
          next();
          
          
          
  
      }catch(error) {
        return res.status(403).json({message: "sorry you are not verified"})
      }
})

const authority = (req,res,next) => {
  
  try {
    if (!req.user.role || !req.user.role.includes("Admin")){
      return res.status(403).json({message: "you can't access this functionality"})
    }
    next();
    
  } catch (error) {
    res.status(500).json({message: "internal server error"})
    
  }

}

module.exports = {
    authenticate,
    authority
}