const Order = require("../models/order.model")
const MenuItem  = require("../models/menuItem.model")
const ApiError = require("../utils/apiError")

class OrderService{

    async createOrder(userId, orderData){
        const  {items , deliveryAddress, specialInstructions } = orderData;
        const orderItems = [];
        let totalAmount = 0;

        for(const item of items){
            const menuItem = await MenuItem.findById(item.menuItem)
            if(!menuItem){
                throw new ApiError(404, `Menu item ${item.menuItem} not found`)
            }

            if(!menuItem.isAvailable){
                throw new ApiError(404, `Menu item ${item.menuItem} is not available`)

            }

            const itemTotal = menuItem.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                menuItem: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity,
                specialInstructions: item.specialInstructions 
            });    
        }

        const estimatedTime = new Date();
        estimatedTime.setMinutes(estimatedTime.getMinutes() + 35);

        const order = await Order.create({
            user: userId,
            items: orderItems,
            deliveryAddress,
            specialInstructions,
            estimatedDeliveryTime: estimatedTime,
            totalAmount: totalAmount
        });

        return await order.populate("user", "name email phone");

    }

    async getOrderById(orderId,userId,role){
        const order = await Order.findById(orderId).populate("user", "name email phone").populate("items.menuItem");
        
        if(!order){
            throw new ApiError(404, "Order not found")
        } 
        
        console.log(order);

        if( (order.user._id.toString() !== userId.toString())){
            throw new ApiError(403, "Not authorized to view this order")
        }

        return order;

    }

    async getUserOrders(userId, status){
        const query = {user: userId};
        if(status)query.status = status;

        return await Order.find(query).populate("items.menuItem").sort({createdAt : -1});
    }

    async getAllOrders(filters = {}){
        const  {status , paymentStatus} = filters;
        const query = {};

        if(status) query.status = status;
        if(paymentStatus) query.paymentStatus = paymentStatus;

        return await Order.find(query)
            .populate('user', 'name email phone')
            .populate('items.menuItem')
            .sort({createdA : -1});
    }

    async updateOrderStatus(orderId, status, userId, role){
        const order = await Order.findById(orderId);
        if(!order) throw new ApiError(404, 'Order not found');

        if(role === 'customer'){
            if(order.user._id.toString() !==  userId.toString()){
                throw new ApiError(403, 'Not authorized to update this order');
            }

            if(status !== 'cancelled' || order.status !== 'pending' ){
                throw new ApiError(400, 'You can only cancel pending orders')
            }
        }

        order.status = status;
        await order.save();

        return await order.populate('user', 'name email phone');
    }

    async cancelOrder(orderId, userId, role, reason){
        const order = await Order.findById(orderId);
        if(!order){
            throw new ApiError(404, 'Order not found');
        }

        if(role === 'customer' && order.user._id.toString() !== userId.toString()){
            throw new ApiError(403, 'Not authorized to cancel this order');
        }

        if (order.status === 'delivered') {
            throw new ApiError(400, 'Cannot cancel delivered orders');
        }

        order.status = 'cancelled';
        order.cancellationReason = reason;
        await order.save();

        return order;
    }

    
}

module.exports = new OrderService();