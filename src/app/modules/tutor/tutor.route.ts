import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './tutor.controller';
import { tutorValidation } from './tutor.validation';




const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);
router.post(
	'/',
	auth(ENUM_USER_ROLE.ADMIN),
	validateRequest(tutorValidation.createTutorZodSchema),
	UserController.insertIntoDB
);
router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	validateRequest(tutorValidation.updateTutorZodSchema),
	UserController.updateOneInDB
);
router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	UserController.deleteByIdFromDB
);



export const TutorRoutes = router;