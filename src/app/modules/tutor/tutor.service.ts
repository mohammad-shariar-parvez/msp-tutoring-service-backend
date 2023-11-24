

import { CourseTutor, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { tutorSearchableFields } from "./tutor.constant";
import { ITutorFilters } from "./tutor.interface";



const insertIntoDB = async (
	data: CourseTutor
): Promise<CourseTutor> => {
	// console.log(data);

	const user = await prisma.courseTutor.create({
		data
	});
	//create access token & refresh token
	return user;

};

const getAllFromDB = async (
	filters: ITutorFilters,
	options: IPaginationOptions

): Promise<IGenericResponse<Partial<CourseTutor>[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
	const { searchTerm, ...filterData } = filters;
	// Extract searchTerm to implement search query

	const andConditions = [];
	// console.log("SEARCH----", filters);
	// console.log("OPtions----", options);


	if (searchTerm) {
		andConditions.push({
			OR: tutorSearchableFields.map((field) => ({
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
	const whereConditons: Prisma.CourseTutorWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};


	const result = await prisma.courseTutor.findMany({
		skip,
		take: limit,
		where: whereConditons,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.courseTutor.count({
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