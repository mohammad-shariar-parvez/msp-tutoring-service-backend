import { courseConditionalFiledsMapper } from './couorse.constants';
/* eslint-disable no-undef */
import { Course, CourseStatus, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import { prisma } from "../../../shared/prisma";
import { courseConditionalFileds, courseRelationalFileds, courseRelationalFiledsMapper, courseSearchableFields } from "./couorse.constants";
import { ICourseFilterRequest } from "./course.interface";



const insertIntoDB = async (data: Course): Promise<Course> => {
    console.log("DATA__", data);

    const result = await prisma.course.create({
        data
    });
    return result;
};


const getCoursesByService = async (
    serviceId: string
): Promise<IGenericResponse<Course[]>> => {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination({});


    const result = await prisma.course.findMany({
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

    const total = await prisma.course.count({
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
};

const getAllFromDB = async (
    filters: ICourseFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];
    console.log("SEARCH term", searchTerm);

    if (searchTerm) {
        andConditions.push({
            OR: courseSearchableFields.map((field) => ({
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
                if (courseRelationalFileds.includes(key)) {
                    return {
                        [courseRelationalFiledsMapper[key]]: {
                            id: value,
                        },
                    };
                }
                else if (courseConditionalFileds.includes(key)) {
                    const amount = Number(value);
                    return {
                        price: {
                            [courseConditionalFiledsMapper[key]]: amount
                        }
                    };
                }
                else if (key === 'status') {
                    return {
                        status: value as CourseStatus, // Exact match for enum field
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

    const whereConditons: Prisma.CourseWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.course.findMany({
        skip,
        take: limit,
        where: whereConditons,
        include: {
            service: true,
            courseTutor: true
        },
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma.course.count({
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
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
    const result = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            service: true,
            courseTutor: true
        },
    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Course>): Promise<Course> => {
    const result = await prisma.course.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Course> => {
    const result = await prisma.course.delete({
        where: {
            id
        }
    });
    return result;
};

export const CourseService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getCoursesByService
};