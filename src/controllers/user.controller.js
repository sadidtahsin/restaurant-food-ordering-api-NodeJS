const User = require("../models/user.model");
const userService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

const userRegister = async(req, res, next) => {
    try{
        const user = await userService.createUser(req.body);
        const token = user.generateAuthToken();
        res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
    } catch (error) {
        // res.status(400).json(new ApiError(400, error.message));
        next(error);     
    }
}

const userLogin = async(req, res, next) => {
    try { 
        const user =  await userService.userLogin(req.body);
        let token = user.generateAuthToken();
        res.json({ message: "User logged in successfully", token });
    } catch (error) {
        next(error);
    }
    
}

const getUserProfile = async(req, res, next) => {
    try {
        user = await userService.getUserById(req.user._id);
        res.status(200).json(new ApiResponse(200, user));
    } catch (error) {
        next(error);
    }
}

const updateUserProfile = async(req, res, next) => {
    try {
        if (req.body.password || req.body.$set?.password) {
            throw new ApiError(400, "Password cannot be updated via this route");
        }
        const updatedUser = await userService.updateUser(req.user._id, req.body);
        res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"));
    } catch (error) {
        next(error);
    }
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