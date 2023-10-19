

import { CourseTutor } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";



const insertIntoDB = async (
	data: CourseTutor
): Promise<CourseTutor> => {
	const user = await prisma.courseTutor.create({
		data
	});
	//create access token & refresh token
	return user;

};

const getAllFromDB = async (

	paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Partial<CourseTutor>[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(paginationOptions);
	// Extract searchTerm to implement search query


	const result = await prisma.courseTutor.findMany({

		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.user.count({});
	return {
		meta: {
			total,
			page,
			limit
		},
		data: result
	};
};


const getByIdFromDB = async (id: string): Promise<Partial<CourseTutor> | null> => {
	const result = await prisma.courseTutor.findUniqueOrThrow({
		where: {
			id,
		},
	});

	return result;
};

const updateOneInDB = async (id: string, payload: Partial<CourseTutor>): Promise<Partial<CourseTutor> | null> => {
	const result = await prisma.courseTutor.update({
		where: {
			id,
		},
		data: payload,
	});

	return result;
};
const deleteByIdFromDB = async (id: string): Promise<Partial<CourseTutor> | null> => {
	const result = await prisma.courseTutor.delete({
		where: {
			id,
		}
	});
	return result;
};



export const UserService = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB,
};