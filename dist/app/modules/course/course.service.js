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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const couorse_constants_1 = require("./couorse.constants");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const couorse_constants_2 = require("./couorse.constants");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DATA__", data);
    const result = yield prisma_1.prisma.course.create({
        data
    });
    return result;
});
const getCoursesByService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination({});
    const result = yield prisma_1.prisma.course.findMany({
        include: {
            service: true,
        },
        where: {
            serviceId
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.course.count({
        where: {
            serviceId
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
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    console.log("SEARCH term", searchTerm);
    if (searchTerm) {
        andConditions.push({
            OR: couorse_constants_2.courseSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                },
            })),
        });
    }
    console.log("------and condition", filterData);
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([key, value]) => {
                if (couorse_constants_2.courseRelationalFileds.includes(key)) {
                    return {
                        [couorse_constants_2.courseRelationalFiledsMapper[key]]: {
                            id: value,
                        },
                    };
                }
                else if (couorse_constants_2.courseConditionalFileds.includes(key)) {
                    const amount = Number(value);
                    return {
                        price: {
                            [couorse_constants_1.courseConditionalFiledsMapper[key]]: amount
                        }
                    };
                }
                else if (key === 'status') {
                    return {
                        status: value, // Exact match for enum field
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
    const result = yield prisma_1.prisma.course.findMany({
        skip,
        take: limit,
        where: whereConditons,
        include: {
            service: true,
            courseTutor: true
        },
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.course.count({
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
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.course.findUnique({
        where: {
            id
        },
        include: {
            service: true,
            courseTutor: true
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.course.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.course.delete({
        where: {
            id
        }
    });
    return result;
});
exports.CourseService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getCoursesByService
};
