const orderService = require('../services/OrderService');

const userOrder = (req,res) => {
    // const { order } = req.body;
    const order = orderService.userOrder();
    if(order){
        res.status(200).send({
            status: 'SUCCESS',
            message: 'Order placed successfully'
        });
    }
};   

module.exports = {
    userOrder
};