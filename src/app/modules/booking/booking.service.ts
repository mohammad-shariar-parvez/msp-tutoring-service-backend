/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Booking } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse, IUser } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { IBookingCourse, } from "./booking.interface";


const insertIntoDB = async (payload: IBookingCourse, user: IUser): Promise<any> => {
	const { userId, role } = user;

	// if (role != "customer") {
	// 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
	// }

	console.log("result", payload);

	const result = await prisma.booking.create({
		data: {
			userId,
			courseId: payload.courseId,
			startDate: payload.startDate,
			startTime: payload.startTime,

		}
	});

	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create booking");
	}


	const responseData = await prisma.booking.findUniqueOrThrow({
		where: {
			id: result.id
		},
		include: {
			course: {
				select: {
					title: true
				}
			},
			user: {
				select: {
					email: true
				}
			}

		}
	});

	return responseData;


};



const getAllFromDB = async (user: IUser, options: IPaginationOptions): Promise<IGenericResponse<any[]>> => {
	const { userId, role } = user;
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);

	if (role == "user") {
		const result = await prisma.booking.findMany({
			where: {
				userId
			},
			include: {
				course: {
					select: {
						title: true
					}
				},
				user: {
					select: {
						email: true
					}
				}


			},
			skip,
			take: limit,
			orderBy: { [sortBy]: sortOrder },
		});


		const total = await prisma.booking.count({
			where: {
				userId
			}
		});

		return {
			meta: {
				page,
				limit,
				total
			},
			data: result
		};
	}
	else {
		const result = await prisma.booking.findMany({
			include: {
				course: {
					select: {
						title: true
					}
				},
				user: {
					select: {
						email: true
					}
				}

			},
			skip,
			take: limit,
			orderBy: { [sortBy]: sortOrder },
		});

		const total = await prisma.booking.count({});

		return {
			meta: {
				page,
				limit,
				total
			},
			data: result
		};
	}

};
const getByIdFromDB = async (user: IUser, orderId: string): Promise<any | null> => {

	const { userId, role } = user;




	if (role == "user") {
		const result = await prisma.booking.findUnique({
			where: {
				id: orderId,
				userId
			},
			include: {
				course: {
					select: {
						title: true
					}
				},
				user: {
					select: {
						email: true
					}
				}

			}
		});

		if (result?.userId != userId) {
			throw new ApiError(httpStatus.FORBIDDEN, 'You Do not have any order with this order id');
		}

		return result;

	}
	else if (role == "admin") {
		const result = await prisma.booking.findUniqueOrThrow({
			where: {
				id: orderId,
			},
			include: {
				course: {
					select: {
						title: true
					}
				},
				user: {
					select: {
						email: true
					}
				}

			}
		});
		return result;
	}

};
const updateOneInDB = async (id: string, payload: Partial<Booking>): Promise<Booking> => {
	const result = await prisma.booking.update({
		where: {
			id
		},
		data: payload
	});
	return result;
};




const deleteByIdFromDB = async (id: string): Promise<Booking> => {




	const result = await prisma.booking.delete({
		where: {
			id
		},
		include: {
			course: {
				select: {
					title: true
				}
			},
			user: {
				select: {
					email: true
				}
			}
		}
	});

	return result;


};


export const BookingService = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB

};