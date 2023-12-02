/* eslint-disable no-undef */
import { Category, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import { prisma } from "../../../shared/prisma";


import { categorySearchableFields } from "./category.constants";
import { ICategoryFilterRequest } from "./category.interface";




const insertIntoDB = async (data: any): Promise<Category> => {
    // const file = data as any;
    // console.log("FILEEEE", data.file);
    // const uploadPromises = async (element: Express.Multer.File) => {
    //     const result = await cloudinary.uploader.upload(file: element.path);
    //     return result;
    // };
    // const uploadImage = await Promise.all(uploadPromises);

    // const uploadedImage = await FileUploadHelper.uploadToCloudinary(data.file);
    // console.log("UPLOAD IOMAGEEE+++++++++++++++++", uploadedImage);
    // if (uploadedImage) {
    //     data.imageUrl = uploadedImage.secure_url;
    // }

    const result = await prisma.category.create({
        data
    });
    console.log("result", result);

    return result;
};

const getAllFromDB = async (
    filters: ICategoryFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
    const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];
    // console.log("SEARCH----", filters);
    // console.log("OPtions----", options);


    if (searchTerm) {
        andConditions.push({
            OR: categorySearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    // console.log("------and condition", searchTerm);

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

    const whereConditons: Prisma.CategoryWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.category.findMany({
        include: {
            courses: true,
        },
        skip,
        take: limit,
        where: whereConditons,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = await prisma.category.count({
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

const getByIdFromDB = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (id: string, payload: Partial<Category>): Promise<Category> => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Category> => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    });
    return result;
};

export const CategoryService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
};