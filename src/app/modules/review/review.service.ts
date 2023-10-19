/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, ReviewAndRating } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse, IUser } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { reviewRelationalFileds, reviewRelationalFiledsMapper } from "./review.constants";
import { IReview, IReviewFilterRequest } from "./review.interface";


const insertIntoDB = async (payload: IReview, user: IUser): Promise<any> => {
	const { userId, role } = user;

	// if (role != "customer") {
	// 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
	// }

	console.log("result", payload);

	const result = await prisma.reviewAndRating.create({
		data: {
			userId,
			courseId: payload.courseId,
			review: payload.review,
			rating: payload.rating,

		}
	});

	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Review");
	}


	const responseData = await prisma.reviewAndRating.findUniqueOrThrow({
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
			},



		}
	});

	return responseData;


};






const getAllFromDB = async (
	filters: IReviewFilterRequest,
	options: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);


	const andConditions = [];


	if (Object.keys(filters).length > 0) {
		andConditions.push({
			AND: Object.entries(filters).map(([key, value]) => {
				if (reviewRelationalFileds.includes(key)) {
					return {
						[reviewRelationalFiledsMapper[key]]: {
							id: value,
						},
					};
				}

				else {
					return {
						[key]: {
							equals: value,
							mode: 'insensitive'
						}
					};

				}
			})
		});
	}

	const whereConditons: Prisma.ReviewAndRatingWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};

	const result = await prisma.reviewAndRating.findMany({
		skip,
		take: limit,
		where: whereConditons,
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
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.reviewAndRating.count({
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










export const ReviewService = {
	insertIntoDB,
	getAllFromDB,


};