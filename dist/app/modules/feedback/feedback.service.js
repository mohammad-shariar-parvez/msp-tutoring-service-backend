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
exports.FeedbackService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const finalData = Object.assign(Object.assign({}, payload), { userId });
    const result = yield prisma_1.prisma.feedback.create({
        data: finalData
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create Review");
    }
    const responseData = yield prisma_1.prisma.feedback.findUniqueOrThrow({
        where: {
            id: result.id
        },
        include: {
            user: true
        }
    });
    return responseData;
});
const insertQuestionIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.question.create({
        data: payload
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create Question");
    }
    const responseData = yield prisma_1.prisma.question.findUniqueOrThrow({
        where: {
            id: result.id
        },
    });
    return responseData;
});
const getAllQuestionFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.prisma.question.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.question.count({});
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getAllFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.prisma.feedback.findMany({
        skip,
        include: {
            user: true
        },
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.feedback.count({});
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const deleteQuestionByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.question.delete({
        where: {
            id
        }
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.feedback.delete({
        where: {
            id
        }
    });
    return result;
});
exports.FeedbackService = {
    insertIntoDB,
    getAllFromDB,
    deleteByIdFromDB,
    insertQuestionIntoDB,
    getAllQuestionFromDB,
    deleteQuestionByIdFromDB
};
