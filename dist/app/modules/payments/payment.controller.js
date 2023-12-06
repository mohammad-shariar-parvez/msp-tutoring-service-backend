"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const config_1 = __importDefault(require("../../../config"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const payment_constants_1 = require("./payment.constants");
const payment_service_1 = require("./payment.service");
const initPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("yooo", req.body);
    const result = yield payment_service_1.PaymentService.initPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment init successfully",
        data: result
    });
});
const success = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.success(req.body);
    res.status(200).redirect(`${config_1.default.frontEnd_url}/payments`);
});
const cancel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.cancel(req.body);
    res.status(200).redirect(`${config_1.default.frontEnd_url}/bookings`);
});
const fail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.fail(req.body);
    res.status(200).redirect(`${config_1.default.frontEnd_url}/user`);
});
const webhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("WEBHOOK");
    const result = yield payment_service_1.PaymentService.webhook(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment verified!",
        data: result
    });
});
const getAllFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const filters = (0, pick_1.default)(req.query, payment_constants_1.paymentFilterableFields);
        const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const result = yield payment_service_1.PaymentService.getAllFromDB(user, filters, options);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Payments fetched successfully',
            meta: result.meta,
            data: result.data
        });
    }
    catch (error) {
        next(error);
    }
});
const getByIdFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        // console.log("NEWW_____", user);
        const paymentId = req.params.paymentId;
        const result = yield payment_service_1.PaymentService.getByIdFromDB(user, paymentId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Payment fetched successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.PaymentController = {
    initPayment,
    webhook,
    success,
    fail,
    cancel,
    getAllFromDB,
    getByIdFromDB
};
