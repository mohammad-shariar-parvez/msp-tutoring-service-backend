import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), PaymentController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), PaymentController.getByIdFromDB);

router.post('/init', PaymentController.initPayment);

router.post('/success', PaymentController.success);
router.post('/cancel', PaymentController.cancel);
router.post('/fail', PaymentController.fail);
router.post('/webhook', PaymentController.webhook);

export const paymentRoutes = router;


