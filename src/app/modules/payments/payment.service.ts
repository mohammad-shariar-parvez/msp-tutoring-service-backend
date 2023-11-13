import { Payment, PaymentStatus, Prisma } from "@prisma/client";
import { IGenericResponse, IUser } from "../../../interfaces/common";

import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";
import { sslService } from "../ssl/ssl.service";
import { paymentSearchableFields } from "./payment.constants";

const initPayment = async (data: any) => {
	// console.log("REQ DATAAA__", data);

	const paymentSession = await sslService.initPayment({
		total_amount: data.total_amount,
		cus_email: data.cus_email,
		course_name: data.course_name,
	});
	// console.log("PAYMENT SESSION", paymentSession);
	// console.log(data);

	await prisma.payment.create({
		data: {
			amount: data.total_amount,
			userId: data.userId,
			bookingId: data.bookingId,
			transactionId: paymentSession?.tranData
		}
	});
	// console.log("payment session", paymentSession?.tranData);
	// console.log("payment session-----", paymentSession);
	return paymentSession.redirectGatewayURL;
};
const success = async (data: any) => {
	// console.log("SUCEES DATA", data);

	const result = await prisma.payment.updateMany({
		where: {
			transactionId: data.tran_id
		},
		data: {
			val_id: data.val_id,
			paymentStatus: PaymentStatus.PAID
		}
	});

	return result;
};

const cancel = async (data: any) => {
	const result = await prisma.payment.deleteMany({
		where: {
			transactionId: data.tran_id
		}
	});
	return result;
};

const fail = async (data: any) => {
	const result = await prisma.payment.deleteMany({
		where: {
			transactionId: data.tran_id
		}
	});
	return result;
};

const webhook = async (payload: any) => {
	if (!payload || !payload?.status || payload?.status !== 'VALID') {
		return {
			massage: 'Invalid Payment!'
		};
	}
	const result = await sslService.validate(payload);

	if (result?.status !== 'VALID') {
		return {
			massage: 'Payment failed'
		};
	}

	const { tran_id } = result;
	await prisma.payment.updateMany({
		where: {
			transactionId: tran_id
		},
		data: {
			paymentStatus: PaymentStatus.PAID,
			paymentGatewayData: payload
		}
	});

	return {
		massage: 'Payment Success'
	};
};


const getAllFromDB = async (
	user: IUser,
	filters: any,
	options: any
): Promise<IGenericResponse<Payment[]>> => {
	const { limit, page, skip } = paginationHelpers.calculatePagination(options);
	const { searchTerm, ...filterData } = filters;
	// console.log("search tertm--", searchTerm);


	const andConditions = [];


	const { userId, role } = user;
	if (role == "user") {
		andConditions.push({ userId: userId });
	}


	if (searchTerm) {
		andConditions.push({
			OR: paymentSearchableFields.map((field) => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive'
				}
			}))
		});
	}

	if (Object.keys(filterData).length > 0) {
		andConditions.push({
			AND: Object.keys(filterData).map((key) => ({
				[key]: {
					equals: (filterData as any)[key]
				}
			}))
		});
	}

	const whereConditions: Prisma.PaymentWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};
	// console.log("WHERE CONDITION", whereConditions);

	const result = await prisma.payment.findMany({
		where: whereConditions,
		include: {
			booking: true,
			user: true,
		},
		skip,
		take: limit,
		orderBy:
			options.sortBy && options.sortOrder
				? { [options.sortBy]: options.sortOrder }
				: {
					createdAt: 'desc'
				}
	});
	const total = await prisma.payment.count({
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



const getByIdFromDB = async (user: IUser, paymentId: string): Promise<any | null> => {
	// console.log("SINGLWEUSWE", user);

	const { userId, role } = user;
	if (role == "user") {
		const result = await prisma.payment.findUnique({
			where: {
				id: paymentId,
				userId
			},
			include: {
				booking: true,
				user: true,
			}
		});

		if (result?.userId != userId) {
			throw new ApiError(httpStatus.FORBIDDEN, 'You Do not have any order with this order id');
		}
		return result;

	}
	else if (role == "admin") {
		const result = await prisma.payment.findUniqueOrThrow({
			where: {
				id: paymentId,

			},
			include: {
				booking: true,
				user: true,
			}
		});
		return result;
	}

};


export const PaymentService = {
	initPayment,
	webhook,
	success,
	cancel,
	fail,
	getAllFromDB,
	getByIdFromDB
};
