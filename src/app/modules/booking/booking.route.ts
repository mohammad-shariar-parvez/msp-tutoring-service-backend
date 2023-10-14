import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';



const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), BookingController.getAllFromDB);
router.get('/:bookingId', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), BookingController.getByIdFromDB);
router.post(
	'/',
	validateRequest(BookingValidation.createBookingZodSchema),
	auth(ENUM_USER_ROLE.USER),
	BookingController.insertIntoDB,
);
router.patch(
	'/:id',
	validateRequest(BookingValidation.updateBookingZodSchema),
	auth(ENUM_USER_ROLE.ADMIN),
	BookingController.updateOneInDB
);

router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
	BookingController.deleteByIdFromDB
);




export const BookingRoutes = router;