"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const subject_controller_1 = require("./subject.controller");
const router = express_1.default.Router();
router.get('/', subject_controller_1.SubjectController.getAllFromDB);
router.get('/:id', subject_controller_1.SubjectController.getByIdFromDB);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), 
// validateRequest(CourseValidations.create),
subject_controller_1.SubjectController.insertIntoDB);
router.patch('/:id', 
// validateRequest(CourseValidations.update),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), subject_controller_1.SubjectController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), subject_controller_1.SubjectController.deleteByIdFromDB);
exports.SubjectRoutes = router;
