import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ContentController } from './content.controller';
import { BlogValidation } from './content.validation';



const router = express.Router();

router.get('/', ContentController.getAllFromDB);

router.post(
	'/',
	validateRequest(BlogValidation.create),
	auth(ENUM_USER_ROLE.ADMIN),
	ContentController.insertIntoDB,
);
router.patch(
	'/:id',
	validateRequest(BlogValidation.update),
	auth(ENUM_USER_ROLE.ADMIN),
	ContentController.updateOneInDB,
);
router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	ContentController.deleteByIdFromDB
);




export const ContentRoutes = router;