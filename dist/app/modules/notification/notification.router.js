"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
router.get('/', notification_controller_1.NotificationController.getByIdFromDB);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), notification_controller_1.NotificationController.insertIntoDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), notification_controller_1.NotificationController.deleteByIdFromDB);
// router.patch(
// 	'/:id',
// 	auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
// 	NotificationController.updateOneInDB,
// );
exports.NotificationRoutes = router;
