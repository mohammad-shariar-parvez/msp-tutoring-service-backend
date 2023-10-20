"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.get('/', blog_controller_1.BlogController.getAllFromDB);
router.get('/:id', blog_controller_1.BlogController.getByIdFromDB);
router.post('/', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.deleteByIdFromDB);
exports.BlogRoutes = router;
