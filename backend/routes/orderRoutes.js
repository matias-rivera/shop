import express from 'express'
const router = express.Router()
import {getUserOrders, addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router