const router = require("express").Router();
const { userRegister, userHome, getUserProfile, userLogin, updateUserProfile } = require("../controllers/user.controller");
const { verify } = require("../middlewares/auth.middleware");


router.get("/", userHome);

router.post("/register", userRegister); 

router.post("/login", userLogin);

router.get("/profile",verify, getUserProfile);

router.put("/profile",verify, updateUserProfile);

module.exports = router;