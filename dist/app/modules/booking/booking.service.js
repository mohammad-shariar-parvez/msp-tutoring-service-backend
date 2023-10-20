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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    // if (role != "customer") {
    // 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
    // }
    console.log("result", payload);
    const result = yield prisma_1.prisma.booking.create({
        data: {
            userId,
            courseId: payload.courseId,
            startDate: payload.startDate,
            startTime: payload.startTime,
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create booking");
    }
    const responseData = yield prisma_1.prisma.booking.findUniqueOrThrow({
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
            }
        }
    });
    return responseData;
});
const getAllFromDB = (user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    if (role == "user") {
        const result = yield prisma_1.prisma.booking.findMany({
            where: {
                userId
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
                }
            },
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
        });
        const total = yield prisma_1.prisma.booking.count({
            where: {
                userId
            }
        });
        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        };
    }
    else {
        const result = yield prisma_1.prisma.booking.findMany({
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
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
        });
        const total = yield prisma_1.prisma.booking.count({});
        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        };
    }
});
const getByIdFromDB = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    if (role == "user") {
        const result = yield prisma_1.prisma.booking.findUnique({
            where: {
                id: orderId,
                userId
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
                }
            }
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) != userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You Do not have any order with this order id');
        }
        return result;
    }
    else if (role == "admin") {
        const result = yield prisma_1.prisma.booking.findUniqueOrThrow({
            where: {
                id: orderId,
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
                }
            }
        });
        return result;
    }
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.delete({
        where: {
            id
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
            }
        }
    });
    return result;
});
exports.BookingService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
};
