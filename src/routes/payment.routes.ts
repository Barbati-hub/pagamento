import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';

const router = Router();

router.post('/', paymentController.initiatePayment);
router.post('/:paymentId/card', paymentController.processCardPayment);
router.get('/:paymentId/pix/status', paymentController.checkPixPayment);
router.post('/:paymentId/cancel', paymentController.cancelPayment);

export default router; 