import { Router } from 'express';
import { orderController } from '../controllers/order.controller';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getUserOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id/status', orderController.updateOrderStatus);

export default router; 