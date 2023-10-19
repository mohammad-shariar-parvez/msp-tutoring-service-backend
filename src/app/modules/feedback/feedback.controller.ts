import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackService } from "./feedback.service";




const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	const user = (req as any).user;
	const result = await FeedbackService.insertIntoDB(req.body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Feedback Fetched Successufully",
		data: result
	});
});
const insertQuestionIntoDB = catchAsync(async (req: Request, res: Response) => {

	const result = await FeedbackService.insertQuestionIntoDB(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Feedback Fetched Successufully",
		data: result
	});
});


const getAllQuestionFromDB = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await FeedbackService.getAllQuestionFromDB(options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Feedback retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await FeedbackService.getAllFromDB(options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Feedback retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});



const deleteQuestionByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await FeedbackService.deleteQuestionByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Question delete successfully',
		data: result
	});
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await FeedbackService.deleteByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Feedback delete successfully',
		data: result
	});
});




export const FeedBackController = {
	insertIntoDB,
	getAllFromDB,
	deleteByIdFromDB,
	insertQuestionIntoDB,
	getAllQuestionFromDB,
	deleteQuestionByIdFromDB

};