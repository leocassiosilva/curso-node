const jwt = require('jsonwebtoken');
const User = require('../models/user');

//get user by jwt token
async function getUserByToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId).select('-password'); // Exclude password field
        return user;
    } catch (error) {
        console.error('Error getting user by token:', error);
        return null;
    }               
}
module.exports = getUserByToken;