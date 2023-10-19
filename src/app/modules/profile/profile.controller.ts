import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
	const user = (req as any).user;

	const myreq = { ...req.body, ...user };

	console.log("PROFILEE--", myreq);
	const result = await ProfileService.insertIntoDB(myreq);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Profile created successfully!",
		data: result
	});
});


const getProfile = catchAsync(async (req: Request, res: Response) => {
	const user = (req as any).user;
	const result = await ProfileService.getProfile(user);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profile retrieved successfully !',
		data: result
	});
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
	const userId = (req as any).user.userId;
	const updatedData = req.body;
	console.log("booody", req.body);
	console.log("id", userId);


	const result = await ProfileService.updateProfile(userId, updatedData);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profile updated successfully !',
		data: result,
	});
});


export const ProfileController = {
	getProfile, updateUser, insertIntoDB

};