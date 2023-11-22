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
exports.NotificationService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, userId } = payload;
    console.log("NOTI", title);
    console.log("USER", userId);
    const result = yield prisma_1.prisma.notification.create({
        data: {
            title,
            userId,
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create Notification");
    }
    const responseData = yield prisma_1.prisma.notification.findUniqueOrThrow({
        where: {
            id: result.id
        },
    });
    return responseData;
});
const getByIdFromDB = (user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    console.log("USER NOTI", userId);
    const result = yield prisma_1.prisma.notification.findMany({
        where: {
            userId,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.notification.count({
        where: {
            userId,
        },
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.notification.delete({
        where: {
            id
        }
    });
    return result;
});
exports.NotificationService = {
    insertIntoDB,
    getByIdFromDB,
    deleteByIdFromDB,
};
