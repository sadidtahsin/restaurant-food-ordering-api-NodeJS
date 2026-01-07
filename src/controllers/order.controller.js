const orderService = require("../services/order.service");
const ApiResponse = require("../utils/apiResponse");

const createOrder = async (req, res, next) =>{
    try{
        const order =  await orderService.createOrder(req.user._id,req.body);
        res.status(201).json(new ApiResponse(201, order, 'Order placed successfully'));

    }catch(err){
        next(err);
    }

};

const getOrderById = async (req, res, next) =>{
    try{
        const order =  await orderService.getOrderById(req.params.id, req.user._id, req.user.role);
        res.status(200).json(new ApiResponse(200, order));
    }catch(err){
        next(err);
    }

}

const getUserOrders = async (req, res, next) =>{
    try {
    const { status } = req.query;
    const orders = await orderService.getUserOrders(req.user._id, status);
    res.status(200).json(new ApiResponse(200, orders));
  } catch (err) {
    next(err);
  }
}


const getAllOrders = async (req, res, next) =>{
    try {
        const { status, paymentStatus } = req.query;
        const orders = await orderService.getAllOrders({ status, paymentStatus });
        res.status(200).json(new ApiResponse(200, orders));
    } catch (err) {
        next(err);
    }
}
const updateOrderStatus = async (req, res, next) =>{
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status, req.user.id, req.user.role);
        res.status(200).json(new ApiResponse(200, order, 'Order status updated'));
    } catch (err) {
        next(err);
    }
}

const cancelOrder = async (req, res, next) =>{
    try {
        const { reason } = req.body;
        const order = await orderService.cancelOrder(req.params.id, req.user.id, req.user.role, reason);
        res.status(200).json(new ApiResponse(200, order, 'Order cancelled successfully'));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
}