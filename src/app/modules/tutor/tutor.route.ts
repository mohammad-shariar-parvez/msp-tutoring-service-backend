import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TutorController } from './tutor.controller';
import { tutorValidation } from './tutor.validation';




const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), TutorController.getAllFromDB);
// router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), TutorController.getByIdFromDB);
router.post(
	'/',
	auth(ENUM_USER_ROLE.ADMIN),
	validateRequest(tutorValidation.createTutorZodSchema),
	TutorController.insertIntoDB
);
router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	validateRequest(tutorValidation.updateTutorZodSchema),
	TutorController.updateOneInDB
);
router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	TutorController.deleteByIdFromDB
);



export const TutorRoutes = router;