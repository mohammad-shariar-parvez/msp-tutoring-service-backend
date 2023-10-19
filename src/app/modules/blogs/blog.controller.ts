import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BlogService } from "./blog.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	//console.log(req.body)
	//c
	const user = (req as any).user;
	const result = await BlogService.insertIntoDB(req.body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Review Fetched Successufully",
		data: result
	});
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await BlogService.getAllFromDB(options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blogs retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogService.getByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog fetched successfully',
		data: result
	});
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogService.updateOneInDB(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog updated successfully',
		data: result
	});
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogService.deleteByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog delete successfully',
		data: result
	});
});





export const BlogController = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB,

};