"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const content_controller_1 = require("./content.controller");
const content_validation_1 = require("./content.validation");
const router = express_1.default.Router();
router.get('/', content_controller_1.ContentController.getAllFromDB);
router.post('/', (0, validateRequest_1.default)(content_validation_1.BlogValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), content_controller_1.ContentController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(content_validation_1.BlogValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), content_controller_1.ContentController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), content_controller_1.ContentController.deleteByIdFromDB);
exports.ContentRoutes = router;
