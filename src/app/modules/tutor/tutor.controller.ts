
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { tutorFilterableFields } from "./tutor.constant";
import { TutorService } from "./tutor.service";





const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	const result = await TutorService.insertIntoDB(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Tutor created successfully',
		data: result
	});
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, tutorFilterableFields);
	const options = pick(req.query, paginationFields);

	const result = await TutorService.getAllFromDB(
		filters,
		options
	);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Users retrieved successfully !',
		meta: result.meta,
		data: result.data
	});
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await TutorService.getByIdFromDB(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User getched successfully !',
		data: result,
	});
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedData = req.body;

	const result = await TutorService.updateOneInDB(id, updatedData);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'user updated successfully !',
		data: result,
	});
});


const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await TutorService.deleteByIdFromDB(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted successfully !',
		data: result,
	});
});

export const TutorController = {

	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB,
};