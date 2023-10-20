"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tutor_controller_1 = require("./tutor.controller");
const tutor_validation_1 = require("./tutor.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutor_controller_1.UserController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutor_controller_1.UserController.getByIdFromDB);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(tutor_validation_1.tutorValidation.createTutorZodSchema), tutor_controller_1.UserController.insertIntoDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(tutor_validation_1.tutorValidation.updateTutorZodSchema), tutor_controller_1.UserController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutor_controller_1.UserController.deleteByIdFromDB);
exports.TutorRoutes = router;
