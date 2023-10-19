/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FAQ } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { IFAQ } from "./content.interface";


const insertIntoDB = async (payload: IFAQ,): Promise<any> => {




	const result = await prisma.fAQ.create({
		data: payload
	});

	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Review");
	}


	const responseData = await prisma.fAQ.findUniqueOrThrow({
		where: {
			id: result.id
		},

	});

	return responseData;


};






const getAllFromDB = async (
	options: IPaginationOptions
): Promise<IGenericResponse<FAQ[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);



	const result = await prisma.fAQ.findMany({
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.blog.count({});

	return {
		meta: {
			page,
			limit,
			total
		},
		data: result
	};
};



const updateOneInDB = async (id: string, payload: Partial<FAQ>): Promise<FAQ> => {
	const result = await prisma.fAQ.update({
		where: {
			id
		},
		data: payload
	});
	return result;
};

const deleteByIdFromDB = async (id: string): Promise<FAQ> => {
	const result = await prisma.fAQ.delete({
		where: {
			id
		}
	});
	return result;
};







export const ContentService = {
	insertIntoDB,
	getAllFromDB,
	updateOneInDB,
	deleteByIdFromDB,

};