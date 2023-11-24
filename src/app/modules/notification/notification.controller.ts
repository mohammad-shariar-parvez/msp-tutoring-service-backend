import { Request, Response } from "express";
import httpStatus from "http-status";
import { IUser } from "../../../interfaces/common";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { NotificationService } from "./notification.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	console.log("NOT666666666666-------------I",);
	const result = await NotificationService.insertIntoDB(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Notification added Successufully",
		data: result
	});
});



const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

	const user: IUser = (req as any).user;
	console.log("NOTIFIIIII-------------I", user);

	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const result = await NotificationService.getByIdFromDB(user, options);
	// console.log("RESULKT", result);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Notification fetched successfully',
		data: result.data,
		meta: result.meta,
	});
});



const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await NotificationService.deleteByIdFromDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Blog delete successfully',
		data: result
	});
});





export const NotificationController = {
	insertIntoDB,
	getByIdFromDB,
	deleteByIdFromDB,

};