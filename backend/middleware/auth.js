const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    // cookies se token lo
    const token = req.cookies.token;

    // validate kro
    if (!token) {
        return res.status(401).send("You are not Logged In");
    }

    try {
        // verify kro jwt se
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        
        // token se data nikal kar req object mein daal do
        req.user = decoded; // decoded object mein pehle se hi userId aur role hai
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).send("Unauthorized: Invalid token");
    }
}

const isFounder = (req, res, next) => {
    // Pehle isLoggedIn chal chuka hai, toh req.user maujood hai
    if (req.user && req.user.role === 'founder') {
        // Agar user ka role 'founder' hai, toh aage badho
        next();
    } else {
        // Agar nahi, toh error bhej do
        res.status(403).json({ message: 'Forbidden: Access denied. Only founders can perform this action.' });
    }
};

// --- Naya `isAdopter` Middleware ---
const isAdopter = (req, res, next) => {
    // Pehle isLoggedIn chal chuka hai, toh req.user maujood hai
    if (req.user && req.user.role === 'adopter') {
        // Agar user ka role 'adopter' hai, toh aage badho
        next();
    } else {
        // Agar nahi, toh error bhej do
        res.status(401).json({ message: 'Forbidden: Access denied. This route is only for adopters.' });
    }
};

module.exports = {
    isLoggedIn,
    isFounder,
    isAdopter // isAdopter ko bhi export kiya
}