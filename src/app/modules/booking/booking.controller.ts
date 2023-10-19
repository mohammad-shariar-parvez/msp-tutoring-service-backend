import { Request, Response } from "express";
import httpStatus from "http-status";
import { IUser } from "../../../interfaces/common";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./booking.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	//console.log(req.body)
	//c
	const user = (req as any).user;
	const result = await BookingService.insertIntoDB(req.body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Booking Fetched Successufully",
		data: result
	});
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
	const user: IUser = (req as any).user;
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await BookingService.getAllFromDB(user, options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Booking retrieved successfully !',
		data: result.data,
		meta: result.meta,
	});
});
const updateOneInDB = catchAsync(async (req: Request, res: Response) => {

	const { id } = req.params;
	console.log("BIKAL", id);
	console.log("BIKAL", req.body);
	const result = await BookingService.updateOneInDB(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Booking retrieved successfully !',
		data: result
	});
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const user: IUser = (req as any).user;
	const bookingId = req.params.bookingId;
	const result = await BookingService.getByIdFromDB(user, bookingId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Booking updated successfully !',
		data: result
	});
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {

	const { id } = req.params;
	const result = await BookingService.deleteByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Booking deleted successfully !',
		data: result
	});
});



export const BookingController = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB

};