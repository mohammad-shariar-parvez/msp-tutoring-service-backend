import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';



const router = express.Router();

router.get('/', auth(), ReviewController.getAllFromDB);

router.post(
	'/',
	validateRequest(ReviewValidation.create),
	auth(ENUM_USER_ROLE.USER),
	ReviewController.insertIntoDB,
);





export const ReviewRoutes = router;