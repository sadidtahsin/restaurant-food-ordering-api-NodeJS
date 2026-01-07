const router = require("express").Router();
const userRouter = require("./user.router");
const menuRouter = require("./menu.router");
const orderRouter = require("./order.router");

router.use("/user", userRouter);
router.use("/menu", menuRouter);
router.use("/orders", orderRouter);

module.exports = router;