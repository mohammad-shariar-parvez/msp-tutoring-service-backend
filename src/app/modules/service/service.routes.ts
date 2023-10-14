import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { ServiceController } from './service.controller';
import { ServiceValidations } from './service.validations';


const router = express.Router();

router.get('/', ServiceController.getAllFromDB);


router.get('/:id', ServiceController.getByIdFromDB);

router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(ServiceValidations.create),
    ServiceController.insertIntoDB);


router.patch(
    '/:id',
    validateRequest(ServiceValidations.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    ServiceController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    ServiceController.deleteByIdFromDB
);

export const ServiceRoutes = router;