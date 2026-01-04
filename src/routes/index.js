const router = require("express").Router();
const userRouter = require("./user.router");
const menuRouter = require("./menu.router");

router.use("/user", userRouter);
router.use("/menu", menuRouter);

module.exports = router;