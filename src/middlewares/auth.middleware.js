// ============================================
// src/middleware/auth.middleware.js
// ============================================
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const User = require('../models/user.model');

const verify = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }

    const decoded = jwt.verify(token, 'app-secraet-key');
    req.user = await User.findById(decoded._id).select('-password');

    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verify };
