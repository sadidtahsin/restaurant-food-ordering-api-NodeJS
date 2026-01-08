const paymentService = require('../services/payment.service');
const ApiResponse = require('../utils/apiResponse');

const processPayment = async (req, res, next) => {
  try {
    const result = await paymentService.processPayment(req.params.orderId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Payment processed'));
  } catch (err) {
    next(err);
  }
};

const getPaymentStatus = async (req, res, next) => {
  try {
    const status = await paymentService.getPaymentStatus(req.params.orderId);
    res.status(200).json(new ApiResponse(200, status));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  processPayment,
  getPaymentStatus
};