import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';



import { SubjectController } from './subject.controller';

const router = express.Router();

router.get('/', SubjectController.getAllFromDB);


router.get('/:id', SubjectController.getByIdFromDB);
router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    // validateRequest(CourseValidations.create),
    SubjectController.insertIntoDB);


router.patch(
    '/:id',
    // validateRequest(CourseValidations.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SubjectController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SubjectController.deleteByIdFromDB
);

export const SubjectRoutes = router;