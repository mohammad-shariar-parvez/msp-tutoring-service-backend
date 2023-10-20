"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service.controller");
const service_validations_1 = require("./service.validations");
const router = express_1.default.Router();
router.get('/', service_controller_1.ServiceController.getAllFromDB);
router.get('/:id', service_controller_1.ServiceController.getByIdFromDB);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(service_validations_1.ServiceValidations.create), service_controller_1.ServiceController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(service_validations_1.ServiceValidations.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.deleteByIdFromDB);
exports.ServiceRoutes = router;
