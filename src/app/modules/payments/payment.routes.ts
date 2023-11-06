import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER), PaymentController.getAllFromDB);
router.get('/:paymentId', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER), PaymentController.getByIdFromDB);
// router.get('/:bookingId', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), PaymentController.getByIdFromDB);
router.post('/init', PaymentController.initPayment);

router.post('/success', PaymentController.success);
router.post('/cancel', PaymentController.cancel);
router.post('/fail', PaymentController.fail);
router.post('/webhook', PaymentController.webhook);

export const paymentRoutes = router;


