import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { NotificationController } from './notification.controller';




const router = express.Router();

router.get('/', NotificationController.getByIdFromDB);

router.post(
	'/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
	NotificationController.insertIntoDB,
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
	NotificationController.deleteByIdFromDB,
);

// router.patch(
// 	'/:id',

// 	auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
// 	NotificationController.updateOneInDB,
// );







export const NotificationRoutes = router;