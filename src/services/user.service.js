const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

class UserService {

    async createUser(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new ApiError(400, "Email is already registered");
        }
        return await User.create(userData);
    }

    async userLogin(userData) {
        
        const user = await User.findOne({ email: userData.email }).select("+password");
        if (!user || !(await user.comparePassword(userData.password))) {
            return new ApiError(400, "Invalid email or password");
        }
        return user;
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUser(userId, updateData) {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }

}

module.exports = new UserService();