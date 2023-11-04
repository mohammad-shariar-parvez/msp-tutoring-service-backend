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
exports.sslService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.ssl.storeId,
            store_passwd: config_1.default.ssl.storePass,
            total_amount: payload.total_amount,
            currency: 'BDT',
            tran_id: (0, uuid_1.v4)(),
            success_url: 'http://localhost:5010/api/v1/payments/success',
            fail_url: 'http://localhost:5010/api/v1/payments/fail',
            cancel_url: 'http://localhost:5010/api/v1/payments/cancel',
            ipn_url: 'http://localhost:5010/api/v1/payments/ipn',
            shipping_method: 'N/A',
            course_name: payload.course_name,
            course_category: 'Payment',
            product_profile: 'User',
            cus_email: payload.cus_email,
            cus_add1: 'Natore',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        // console.log("DAAATTTTAAA__________ ++", data);
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: config_1.default.ssl.sslPaymentUrl,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        // console.log("Payment RESPONSE", response);
        const tranData = data === null || data === void 0 ? void 0 : data.tran_id;
        return Object.assign(Object.assign({}, response.data), { tranData });
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment error");
    }
});
const validate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: 'GET',
            url: `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${config_1.default.ssl.storeId}&store_passwd=${config_1.default.ssl.storePass}&format=json`
            // url: config.ssl.sslPaymentUrl
        });
        // console.log("VALIDATE------", response);
        // console.log("URL", `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`);
        // console.log("RESPONSE---------------------", response.data);
        return response.data;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment error");
    }
});
exports.sslService = {
    initPayment,
    validate
};
