import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const signupUser = catchAsync(async (req: Request, res: Response) => {
	console.log("111111111111111");





	const { ...userData } = req.body;
	const result = await AuthService.signupUser(userData);
	const { refreshToken } = result;
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};
	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendResponse<ILoginUserResponse>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User signin successfully!',
		data: result,
	});
});


const signinUser = catchAsync(async (req: Request, res: Response) => {
	console.log("2222222222222222");
	const { ...loginData } = req.body;
	const result = await AuthService.signinUser(loginData);
	const { refreshToken } = result;
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};
	// console.log(refreshToken, cookieOptions);

	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendResponse<ILoginUserResponse>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User signin successfully!',
		data: result,
	});
});
const oAuthUser = catchAsync(async (req: Request, res: Response) => {
	console.log("333333333333333");
	// console.log("EMAI:::------", req.body);

	const result = await AuthService.oAuthUser(req.body);
	const { refreshToken } = result;
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};
	// console.log(refreshToken, cookieOptions);

	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendResponse<ILoginUserResponse>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User signin successfully!',
		data: result,
	});
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
	console.log("444444444444444");
	const { refreshToken } = req.body;


	// console.log("YEEEEE----------------------", req);
	const result = await AuthService.refreshToken(refreshToken);

	// set refresh token into cookie


	sendResponse<IRefreshTokenResponse>(res, {
		success: true,
		statusCode: 200,
		message: 'User logged in successfully !',
		data: result,
	});
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
	console.log("5555555555555555");
	const user = req.user;
	const { ...passwordData } = req.body;

	await AuthService.changePassword(user, passwordData);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Password changed successfully !',
	});
});

const forgotPass = catchAsync(async (req: Request, res: Response) => {
	console.log("6666666666666666666");
	await AuthService.forgotPass(req.body);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Check your email!",
	});
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
	console.log("777777777777777777");
	// const token = req.headers.authorization || "";
	await AuthService.resetPassword(req.body);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Account recovered!",
	});
});

export const AuthController = {
	signupUser,
	signinUser,
	refreshToken,
	changePassword,
	resetPassword,
	forgotPass,
	oAuthUser
};
