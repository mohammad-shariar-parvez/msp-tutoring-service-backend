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
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const payment_constants_1 = require("./payment.constants");
const payment_service_1 = require("./payment.service");
const initPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.initPayment(req.body);
    res.redirect(result);
    // sendResponse(res, {
    // 	success: true,
    // 	statusCode: httpStatus.OK,
    // 	message: "Payment init successfully",
    // 	data: result
    // });
});
const success = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.success(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Success Result",
        data: result
    });
});
const cancel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.cancel(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cancel Result",
        data: result
    });
});
const fail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.fail(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Success Result",
        data: result
    });
});
const webhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("WEBHOOK");
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
        const filters = (0, pick_1.default)(req.query, payment_constants_1.paymentFilterableFields);
        const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        const result = yield payment_service_1.PaymentService.getAllFromDB(filters, options);
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
        const { id } = req.params;
        const result = yield payment_service_1.PaymentService.getByIdFromDB(id);
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
