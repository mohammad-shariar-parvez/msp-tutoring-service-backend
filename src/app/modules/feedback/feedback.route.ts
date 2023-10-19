import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { FeedBackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';




const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), FeedBackController.getAllFromDB);

router.post(
	'/',
	validateRequest(FeedbackValidation.create),
	auth(ENUM_USER_ROLE.USER),
	FeedBackController.insertIntoDB,
);

router.get('/questions', auth(ENUM_USER_ROLE.ADMIN), FeedBackController.getAllQuestionFromDB);

router.post(
	'/questions',
	validateRequest(FeedbackValidation.createQuestion),
	FeedBackController.insertQuestionIntoDB,
);
router.delete('/questions/:id', auth(ENUM_USER_ROLE.ADMIN),
	FeedBackController.deleteQuestionByIdFromDB,
);

router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	FeedBackController.deleteByIdFromDB
);





export const FeedbackRoutes = router;