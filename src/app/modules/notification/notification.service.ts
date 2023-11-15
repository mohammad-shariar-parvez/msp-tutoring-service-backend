import { Notification } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse, IUser } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { INotification } from "./notification.interface";


const insertIntoDB = async (payload: INotification): Promise<Notification> => {
	const { title, userId } = payload;
	console.log("NOTI", title);
	console.log("USER", userId);


	const result = await prisma.notification.create({
		data: {
			title,
			userId,

		}
	});

	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Notification");
	}


	const responseData = await prisma.notification.findUniqueOrThrow({
		where: {
			id: result.id
		},

	});
	return responseData;

};


const getByIdFromDB = async (
	user: IUser, options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
	const { userId } = user;

	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);

	console.log("USER NOTI", userId);


	const result = await prisma.notification.findMany({

		where: {
			userId,
		},
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.notification.count({
		where: {
			userId,
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


const deleteByIdFromDB = async (id: string): Promise<Notification> => {
	const result = await prisma.notification.delete({
		where: {
			id
		}
	});
	return result;
};

export const NotificationService = {
	insertIntoDB,
	getByIdFromDB,
	deleteByIdFromDB,
};