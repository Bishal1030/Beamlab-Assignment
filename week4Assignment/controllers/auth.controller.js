const authService = require('../services/user/auth.service.js')

const userLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const { token, role } = await authService.Login(email, password);
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Check if user is accessing the correct route
        if (req.path.includes('/user/login') && role !== 'User') {
            return res.status(403).json({ message: "Access denied! Only Users can log in here." });
        }

        if (req.path.includes('/admin/login') && role !== 'Admin') {
            return res.status(403).json({ message: "Access denied! Only Admins can log in here." });
        }

        res.status(200).json({ message: `Successfully logged in as ${role}`, data: { token, role } });

    } catch (err) {
        console.error("Error in userLogin controller:", err); 
        res.status(500).json({ message: "Internal server error", data: null });
    }
}


module.exports = {userLogin};