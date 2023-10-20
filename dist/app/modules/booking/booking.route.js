"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.getAllFromDB);
router.get('/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.getByIdFromDB);
router.post('/', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookingZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.deleteByIdFromDB);
exports.BookingRoutes = router;
