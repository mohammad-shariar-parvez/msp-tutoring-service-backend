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
exports.TutorService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const utils_1 = require("../../../shared/utils");
const tutor_constant_1 = require("./tutor.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("REAL DATAAAAAA++++++++", data);
    const { subjects } = data, tutorDetails = __rest(data, ["subjects"]);
    const newTutor = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.courseTutor.create({
            data: tutorDetails
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create Tutor");
        }
        if (subjects && subjects.length > 0) {
            //------
            yield (0, utils_1.asyncForEach)(subjects, (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                const createTutorResult = yield transactionClient.subjectTutor.create({
                    data: {
                        courseTutorId: result.id,
                        subjectId
                    }
                });
                // console.log("createPrerequisite", createTutorResult);
            }));
        }
        return result;
    }));
    if (newTutor) {
        const responseData = yield prisma_1.prisma.subjectTutor.findMany({
            where: {
                courseTutorId: newTutor.id
            },
            include: {
                subject: true,
                courseTutor: true
            }
        });
        return responseData;
    }
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, subjectId } = filters, filterData = __rest(filters, ["searchTerm", "subjectId"]);
    // console.log("MY LOCATOIN", subjectId);
    // Extract searchTerm to implement search query
    const andConditions = [];
    // console.log("SEARCH----", filters);
    // console.log("OPtions----", options);
    if (subjectId) {
        // Add condition to filter courses based on the location
        andConditions.push({
            subjects: {
                some: {
                    subjectId: {
                        contains: subjectId,
                        mode: 'insensitive'
                    }
                }
            }
        });
    }
    // console.log("MY AND", andConditions);
    if (searchTerm) {
        andConditions.push({
            OR: tutor_constant_1.tutorSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            AND: Object.entries(filterData).map(([key, value]) => {
                return {
                    [key]: {
                        equals: value,
                        mode: 'insensitive'
                    }
                };
            })
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    // console.log(whereConditons);
    const result = yield prisma_1.prisma.courseTutor.findMany({
        skip,
        take: limit,
        where: whereConditons,
        include: {
            subjects: true
        },
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.courseTutor.count({
        where: whereConditons
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
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courseTutor.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            subjects: {
                include: {
                    courseTutor: true,
                    subject: true
                }
            }
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjects } = payload, tutorsData = __rest(payload, ["subjects"]);
    const updateTutor = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updateTutorResult = yield transactionClient.courseTutor.update({
            where: {
                id,
            },
            data: tutorsData,
        });
        if (!updateTutorResult) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to update Tutor");
        }
        // Delete existing subject-tutor associations
        yield transactionClient.subjectTutor.deleteMany({
            where: { courseTutorId: id },
        });
        if (subjects && subjects.length > 0) {
            //------
            yield (0, utils_1.asyncForEach)(subjects, (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                const createTutorResult = yield transactionClient.subjectTutor.create({
                    data: {
                        courseTutorId: id,
                        subjectId
                    }
                });
                // console.log("createPrerequisite", createTutorResult);
            }));
        }
        return updateTutorResult;
    }));
    const responseData = yield prisma_1.prisma.subjectTutor.findMany({
        where: {
            courseTutorId: updateTutor.id
        }
    });
    return responseData;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // return result;
    const newDeletedBooking = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // const findTutor = await transactionClient.subjectTutor.findFirst({
        // 	where: {
        // 		courseTutorId: id
        // 	}
        // });
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const deletedFromSubjetTutor = yield transactionClient.subjectTutor.deleteMany({
            where: {
                courseTutorId: id
            }
        });
        // console.log("deletepayment===============", deletedFromSubjetTutor);
        // if (deletedFromSubjetTutor?.count == 0) {
        // 	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to Delete from SubjetTutor Database");
        // }
        const deletedTutor = yield transactionClient.courseTutor.delete({
            where: {
                id,
            }
        });
        // console.log("delete bbooking", deletedTutor);
        return deletedTutor;
    }));
    return newDeletedBooking;
});
exports.TutorService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
};
