/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Blog } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse, IUser } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { IBlog } from "./blog.interface";


const insertIntoDB = async (payload: IBlog, user: IUser): Promise<any> => {
	const { userId } = user;

	const finalData = { ...payload, ...{ userId } };

	const result = await prisma.blog.create({
		data: finalData
	});

	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Review");
	}


	const responseData = await prisma.blog.findUniqueOrThrow({
		where: {
			id: result.id
		},
		include: {
			user: true,
		}
	});

	return responseData;


};






const getAllFromDB = async (
	options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);



	const result = await prisma.blog.findMany({
		skip,
		take: limit,
		include: {
			user: true
		},
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


const getByIdFromDB = async (id: string): Promise<Blog | null> => {
	const result = await prisma.blog.findUnique({
		where: {
			id
		},
		include: {
			user: true
		},
	});
	return result;
};

const updateOneInDB = async (id: string, payload: Partial<Blog>): Promise<Blog> => {
	const result = await prisma.blog.update({
		where: {
			id
		},
		data: payload
	});
	return result;
};

const deleteByIdFromDB = async (id: string): Promise<Blog> => {
	const result = await prisma.blog.delete({
		where: {
			id
		}
	});
	return result;
};







export const BlogService = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB,

};