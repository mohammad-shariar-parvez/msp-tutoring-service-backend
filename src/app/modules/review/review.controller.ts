import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { reviewFilterableFields } from "./review.constants";
import { ReviewService } from "./review.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	//console.log(req.body)
	//c
	const user = (req as any).user;
	const result = await ReviewService.insertIntoDB(req.body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Review Fetched Successufully",
		data: result
	});
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const filters = pick(req.query, reviewFilterableFields);
	const result = await ReviewService.getAllFromDB(filters, options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Booking retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});






export const ReviewController = {
	insertIntoDB,
	getAllFromDB,

};