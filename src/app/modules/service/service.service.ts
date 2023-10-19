/* eslint-disable no-undef */
import { Prisma, Service } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import { prisma } from "../../../shared/prisma";

import { serviceSearchableFields } from "./service.constants";
import { IServiceFilterRequest } from "./service.interface";




const insertIntoDB = async (data: Service): Promise<Service> => {
    const result = await prisma.service.create({
        data
    });
    return result;
};

const getAllFromDB = async (
    filters: IServiceFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];
    // console.log("SEARCH----", filters);
    // console.log("OPtions----", options);


    if (searchTerm) {
        andConditions.push({
            OR: serviceSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    console.log("------and condition", searchTerm);

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

    const whereConditons: Prisma.ServiceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.service.findMany({
        include: {
            courses: true,
        },
        skip,
        take: limit,
        where: whereConditons,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma.service.count({
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

const getByIdFromDB = async (id: string): Promise<Service | null> => {
    const result = await prisma.service.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Service>): Promise<Service> => {
    const result = await prisma.service.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Service> => {
    const result = await prisma.service.delete({
        where: {
            id
        }
    });
    return result;
};

export const ServiceService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
};