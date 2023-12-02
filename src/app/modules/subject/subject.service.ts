
/* eslint-disable no-undef */

import { Prisma, Subject } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import { prisma } from "../../../shared/prisma";
import { subjectSearchableFields } from "./subject.constants";
import { ISubjectFilterRequest } from "./subject.interface";




const insertIntoDB = async (data: Subject): Promise<Subject> => {
    const result = await prisma.subject.create({
        data
    });
    return result;
};




const getAllFromDB = async (
    options: IPaginationOptions,
    filters: ISubjectFilterRequest
): Promise<IGenericResponse<Subject[]>> => {


    const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;


    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: subjectSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {

                return {
                    [key]: {
                        equals: (filterData as any)[key]
                    }
                };

            })
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const whereConditions: Prisma.SubjectWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};


    const result = await prisma.subject.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },

    });
    const total = await prisma.subject.count({
        where: whereConditions
    });
    // const total = await prisma.subject.count({
    //     where: {
    //         id: filterData.subjectId
    //     },
    // });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<Subject | null> => {

    const result = await prisma.subject.findFirst({
        where: {
            id,

        },


    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Subject>): Promise<Subject> => {
    // console.log("Payload----------------------------------------------------", id, payload);

    const result = await prisma.subject.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Subject> => {
    const result = await prisma.subject.delete({
        where: {
            id
        }
    });
    return result;
};

export const SubjectService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,

};