const router = require('express').Router();
const { processPayment, getPaymentStatus } = require('../controllers/payment.controller');
const { verify } = require('../middlewares/auth.middleware');

router.post('/:orderId', verify, processPayment);
router.get('/:orderId/status', verify, getPaymentStatus);

module.exports = router;

