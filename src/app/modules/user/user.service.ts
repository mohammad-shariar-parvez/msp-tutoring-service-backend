import { Prisma, User } from "@prisma/client";
import config from "../../../config";

import { bcryptHelpers } from "../../../helpers/bycryptHelpers";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { userSearchableFields } from "./user.constant";
import { IUserFilters } from "./user.interface";



const insertIntoDB = async (
	userData: any
): Promise<User> => {


	const defaultPassword = config.default_user_pass as string;
	const hashedPassword = await bcryptHelpers.hashedPassword(defaultPassword);
	console.log("USER DATA", {
		...userData,
		password: await hashedPassword,
	},);

	const user = await prisma.user.create({
		data: {
			...userData,
			password: await hashedPassword,
		},
	});
	//create access token & refresh token
	return user;

};

const getAllUsers = async (
	filters: IUserFilters,
	paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Partial<User>[]>> => {

	// Extract searchTerm to implement search query
	const { searchTerm, ...filtersData } = filters;
	const { limit, page, skip, sortBy, sortOrder, } =
		paginationHelpers.calculatePagination(paginationOptions);

	const andConditions = [];
	// Search needs $OR for searching in specified fields
	if (searchTerm) {
		andConditions.push({
			OR: userSearchableFields.map(field => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			}))
		});
	}
	// Filters needs $and to fullfill all the conditions
	if (Object.keys(filtersData).length) {
		andConditions.push({
			AND: Object.entries(filtersData).map(([field, value]) => ({
				[field]: {
					equals: value,
				},
			})),
		});
	}

	const whereConditions: Prisma.UserWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};


	const result = await prisma.user.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.user.count({
		where: whereConditions
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


const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
	const result = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
	});

	return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<Partial<User> | null> => {
	const result = await prisma.user.update({
		where: {
			id,
		},
		data: payload,
	});

	return result;
};
const deleteUser = async (id: string): Promise<Partial<User> | null> => {
	const result = await prisma.user.delete({
		where: {
			id,
		}
	});
	return result;
};



export const UserService = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
	insertIntoDB
};