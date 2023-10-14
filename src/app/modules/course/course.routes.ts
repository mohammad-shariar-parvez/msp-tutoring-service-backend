import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { CourseController } from './course.controller';
import { CourseValidations } from './course.validations';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get('/:serviceId/service', CourseController.getCoursesByService);
router.get('/:id', CourseController.getByIdFromDB);
router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidations.create),
    CourseController.insertIntoDB);


router.patch(
    '/:id',
    validateRequest(CourseValidations.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.deleteByIdFromDB
);

export const CourseRoutes = router;