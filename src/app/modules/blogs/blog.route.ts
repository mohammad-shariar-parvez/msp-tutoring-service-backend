import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';



const router = express.Router();

router.get('/', BlogController.getAllFromDB);
router.get('/:id', BlogController.getByIdFromDB);

router.post(
	'/',
	validateRequest(BlogValidation.create),
	auth(ENUM_USER_ROLE.ADMIN),
	BlogController.insertIntoDB,
);
router.patch(
	'/:id',
	validateRequest(BlogValidation.update),
	auth(ENUM_USER_ROLE.ADMIN,),
	BlogController.updateOneInDB,
);
router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	BlogController.deleteByIdFromDB
);




export const BlogRoutes = router;