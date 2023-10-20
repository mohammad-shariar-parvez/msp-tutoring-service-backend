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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const review_constants_1 = require("./review.constants");
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    // if (role != "customer") {
    // 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
    // }
    console.log("result", payload);
    const result = yield prisma_1.prisma.reviewAndRating.create({
        data: {
            userId,
            courseId: payload.courseId,
            review: payload.review,
            rating: payload.rating,
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create Review");
    }
    const responseData = yield prisma_1.prisma.reviewAndRating.findUniqueOrThrow({
        where: {
            id: result.id
        },
        include: {
            course: {
                select: {
                    title: true
                }
            },
            user: {
                select: {
                    email: true
                }
            },
        }
    });
    return responseData;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.entries(filters).map(([key, value]) => {
                if (review_constants_1.reviewRelationalFileds.includes(key)) {
                    return {
                        [review_constants_1.reviewRelationalFiledsMapper[key]]: {
                            id: value,
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: value,
                            mode: 'insensitive'
                        }
                    };
                }
            })
        });
    }
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.reviewAndRating.findMany({
        skip,
        take: limit,
        where: whereConditons,
        include: {
            course: {
                select: {
                    title: true
                }
            },
            user: {
                select: {
                    email: true
                }
            }
        },
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.reviewAndRating.count({
        where: whereConditons
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
exports.ReviewService = {
    insertIntoDB,
    getAllFromDB,
};
