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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const ssl_service_1 = require("../ssl/ssl.service");
const payment_constants_1 = require("./payment.constants");
const initPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("REQ DATAAA__", data);
    const paymentSession = yield ssl_service_1.sslService.initPayment({
        total_amount: data.total_amount,
        cus_email: data.cus_email,
        course_name: data.course_name,
    });
    // console.log("PAYMENT SESSION", paymentSession);
    // console.log(data);
    yield prisma_1.prisma.payment.create({
        data: {
            amount: data.total_amount,
            userId: data.userId,
            bookingId: data.bookingId,
            transactionId: paymentSession === null || paymentSession === void 0 ? void 0 : paymentSession.tranData
        }
    });
    // console.log("payment session", paymentSession?.tranData);
    // console.log("payment session-----", paymentSession);
    return paymentSession.redirectGatewayURL;
});
const success = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("SUCEES DATA", data);
    const result = yield prisma_1.prisma.payment.updateMany({
        where: {
            transactionId: data.tran_id
        },
        data: {
            val_id: data.val_id,
            paymentStatus: client_1.PaymentStatus.PAID
        }
    });
    return result;
});
const cancel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.payment.deleteMany({
        where: {
            transactionId: data.tran_id
        }
    });
    return result;
});
const fail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.payment.deleteMany({
        where: {
            transactionId: data.tran_id
        }
    });
    return result;
});
const webhook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.status) || (payload === null || payload === void 0 ? void 0 : payload.status) !== 'VALID') {
        return {
            massage: 'Invalid Payment!'
        };
    }
    const result = yield ssl_service_1.sslService.validate(payload);
    if ((result === null || result === void 0 ? void 0 : result.status) !== 'VALID') {
        return {
            massage: 'Payment failed'
        };
    }
    const { tran_id } = result;
    yield prisma_1.prisma.payment.updateMany({
        where: {
            transactionId: tran_id
        },
        data: {
            paymentStatus: client_1.PaymentStatus.PAID,
            paymentGatewayData: payload
        }
    });
    return {
        massage: 'Payment Success'
    };
});
const getAllFromDB = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    // console.log("search tertm--", searchTerm);
    const andConditions = [];
    const { userId, role } = user;
    if (role == "user") {
        andConditions.push({ userId: userId });
    }
    if (searchTerm) {
        andConditions.push({
            OR: payment_constants_1.paymentSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // console.log("WHERE CONDITION", whereConditions);
    const result = yield prisma_1.prisma.payment.findMany({
        where: whereConditions,
        include: {
            booking: true,
            user: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            }
    });
    const total = yield prisma_1.prisma.payment.count({
        where: whereConditions
    });
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
const getByIdFromDB = (user, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("SINGLWEUSWE", user);
    const { userId, role } = user;
    if (role == "user") {
        const result = yield prisma_1.prisma.payment.findUnique({
            where: {
                id: paymentId,
                userId
            },
            include: {
                booking: true,
                user: true,
            }
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) != userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You Do not have any order with this order id');
        }
        return result;
    }
    else if (role == "admin") {
        const result = yield prisma_1.prisma.payment.findUniqueOrThrow({
            where: {
                id: paymentId,
            },
            include: {
                booking: true,
                user: true,
            }
        });
        return result;
    }
});
exports.PaymentService = {
    initPayment,
    webhook,
    success,
    cancel,
    fail,
    getAllFromDB,
    getByIdFromDB
};
