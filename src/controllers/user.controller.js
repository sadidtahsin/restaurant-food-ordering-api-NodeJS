const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

const userRegister = async(req, res) => {
    let body = req.body;
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        throw new ApiError(400, "Email is already registered");
    }
    user = await User.create(body);
    let token = user.generateAuthToken();
    res.json({ message: "User registered successfully "+ token });
}

const userLogin = async(req, res) => {
    let body = req.body;
    let user = await User.findOne({ email: body.email }).select("+password");
    if (!user || !(await user.comparePassword(body.password))) {
        return ApiError(400, "Invalid email or password");
    }
    let token = user.generateAuthToken();
    res.json({ message: "User logged in successfully", token });
}

const getUserProfile = async(req, res) => {
    res.json(req.user);
}

const updateUserProfile = async(req, res) => {
    res.send("Update User Profile Endpoint");
}

const userHome = async(req, res) => {
    res.send("Hello from User Router");
}

module.exports = {
    userHome,
    userRegister,
    userLogin,
    getUserProfile,
    updateUserProfile,
    
};