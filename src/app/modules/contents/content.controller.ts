import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ContentService } from "./content.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

	const result = await ContentService.insertIntoDB(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Contents Fetched Successufully",
		data: result
	});
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await ContentService.getAllFromDB(options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Contents retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await ContentService.getByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Content retrieved successfully !',
		data: result

	});
});



const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	// console.log("FAQ", req.body);

	const result = await ContentService.updateOneInDB(id, req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Contents updated successfully',
		data: result
	});
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await ContentService.deleteByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Contents delete successfully',
		data: result
	});
});

export const ContentController = {
	insertIntoDB,
	getAllFromDB,
	updateOneInDB,
	deleteByIdFromDB,
	getByIdFromDB

};