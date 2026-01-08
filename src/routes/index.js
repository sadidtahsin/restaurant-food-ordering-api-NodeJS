const router = require("express").Router();
const userRouter = require("./user.router");
const menuRouter = require("./menu.router");
const orderRouter = require("./order.router");
const paymentRoutes = require('./payment.router');

router.use("/user", userRouter);
router.use("/menu", menuRouter);
router.use("/orders", orderRouter);
router.use("/payments", paymentRoutes);

module.exports = router;