const registerService = require("../services/user/register.service.js");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const register = await registerService.registerUser(name, email, password);
  

    res
      .status(201)
      .json({ message: "user registered successfully", data: register });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};


module.exports = {createUser}
