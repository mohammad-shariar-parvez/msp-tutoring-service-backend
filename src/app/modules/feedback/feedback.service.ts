/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Feedback, Question } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse, IUser } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { IFeedback, IQuestion } from "./feedback.interface";


const insertIntoDB = async (payload: IFeedback, user: IUser): Promise<any> => {
	const { userId } = user;
	const finalData = { ...payload, ...{ userId } };
	const result = await prisma.feedback.create({
		data: finalData
	});
	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Review");
	}
	const responseData = await prisma.feedback.findUniqueOrThrow({
		where: {
			id: result.id
		},
		include: {
			user: true
		}
	});
	return responseData;
};
const insertQuestionIntoDB = async (payload: IQuestion): Promise<any> => {

	const result = await prisma.question.create({
		data: payload
	});
	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Question");
	}
	const responseData = await prisma.question.findUniqueOrThrow({
		where: {
			id: result.id
		},

	});
	return responseData;
};






const getAllQuestionFromDB = async (
	options: IPaginationOptions
): Promise<IGenericResponse<Question[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);



	const result = await prisma.question.findMany({
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.question.count({});

	return {
		meta: {
			page,
			limit,
			total
		},
		data: result
	};
};
const getAllFromDB = async (
	options: IPaginationOptions
): Promise<IGenericResponse<Feedback[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);



	const result = await prisma.feedback.findMany({
		skip,
		include: {
			user: true
		},
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.feedback.count({});

	return {
		meta: {
			page,
			limit,
			total
		},
		data: result
	};
};




const deleteQuestionByIdFromDB = async (id: string): Promise<Question> => {
	const result = await prisma.question.delete({
		where: {
			id
		}
	});
	return result;
};
const deleteByIdFromDB = async (id: string): Promise<Feedback> => {
	const result = await prisma.feedback.delete({
		where: {
			id
		}
	});
	return result;
};







export const FeedbackService = {
	insertIntoDB,
	getAllFromDB,
	deleteByIdFromDB,
	insertQuestionIntoDB,
	getAllQuestionFromDB,
	deleteQuestionByIdFromDB

};