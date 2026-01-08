const Order = require('../models/order.model');
const ApiError = require('../utils/apiError');

class PaymentService {
  async processPayment(orderId, paymentData) {
    const { paymentMethod, cardNumber } = paymentData;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    if (order.paymentStatus === 'completed') {
      throw new ApiError(400, 'Payment already completed');
    }

    // Dummy payment processing
    const paymentSuccess = this.simulatePayment(paymentMethod, cardNumber);

    if (paymentSuccess) {
      order.paymentStatus = 'completed';
      order.paymentMethod = paymentMethod;
      order.status = 'confirmed'; // Auto-confirm order on successful payment
      await order.save();

      return {
        success: true,
        transactionId: `TXN${Date.now()}`,
        amount: order.totalAmount,
        message: 'Payment processed successfully'
      };
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      throw new ApiError(400, 'Payment failed');
    }
  }

  simulatePayment(method, cardNumber) {
    // Dummy payment logic
    if (method === 'cash') return true;
    
    // For card payments, check if card number is valid format
    if (method === 'card' || method === 'online') {
      if (!cardNumber || cardNumber.length < 16) return false;
      return Math.random() > 0.05; // 95% success rate
    }

    return false;
  }

  async getPaymentStatus(orderId) {
    const order = await Order.findById(orderId).select('paymentStatus totalAmount paymentMethod');
    if (!order) {
      throw new ApiError(404, 'Order not found');
    }
    return order;
  }
}

module.exports = new PaymentService();