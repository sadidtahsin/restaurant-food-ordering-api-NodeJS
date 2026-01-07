const router = require('express').Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/order.controller');
const { verify } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require('../middlewares/role.middleware');


// Customer routes
router.post('/', verify, createOrder);
router.get('/my-orders', verify, getUserOrders);
router.get('/:id', verify, getOrderById);
router.patch('/:id/cancel', verify, cancelOrder);

// Admin routes
// router.get('/', verify, getAllOrders);
router.get('/', verify, authorizeRoles('admin'), getAllOrders);

router.patch('/:id/status', verify, updateOrderStatus);

module.exports = router;