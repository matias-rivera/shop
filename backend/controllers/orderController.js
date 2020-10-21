import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) =>{
    
    //get data from request
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
     } = req.body

     //if cart is empty
     if(orderItems && orderItems.length === 0){
         res.status(400)
         throw new Error('No items in order')
         return
     } else {
         const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
         })

         const createdOrder = await order.save()
         res.status(201).json(createdOrder)
     }
})

export { addOrderItems }