/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

import config from "../../../config";
import { IUser } from "../../../interfaces/common";
import sendResponse from "../../../shared/sendResponse";
import { paymentFilterableFields } from "./payment.constants";
import { PaymentService } from "./payment.service";

const initPayment = async (req: Request, res: Response, next: NextFunction) => {
	// console.log("yooo", req.body);

	const result = await PaymentService.initPayment(req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Payment init successfully",
		data: result
	});
};
const success = async (req: Request, res: Response, next: NextFunction) => {
	const result = await PaymentService.success(req.body);
	res.status(200).redirect(`${config.frontEnd_url}/payment?status=success`);
};
const cancel = async (req: Request, res: Response, next: NextFunction) => {
	const result = await PaymentService.cancel(req.body);
	res.status(200).redirect(`${config.frontEnd_url}/bookings`);
};
const fail = async (req: Request, res: Response, next: NextFunction) => {
	const result = await PaymentService.fail(req.body);
	res.status(200).redirect(`${config.frontEnd_url}/payment?status=fail`);
};

const webhook = async (req: Request, res: Response, next: NextFunction) => {
	// console.log("WEBHOOK");

	const result = await PaymentService.webhook(req.query);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Payment verified!",
		data: result
	});
};

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = (req as any).user;
		const filters = pick(req.query, paymentFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
		const result = await PaymentService.getAllFromDB(user, filters, options);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Payments fetched successfully',
			meta: result.meta,
			data: result.data
		});
	} catch (error) {
		next(error);
	}
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = (req as any).user;
		// console.log("NEWW_____", user);

		const paymentId = req.params.paymentId;
		const result = await PaymentService.getByIdFromDB(user, paymentId);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Payment fetched successfully',
			data: result
		});
	} catch (error) {
		next(error);
	}
};

export const PaymentController = {
	initPayment,
	webhook,
	success,
	fail,
	cancel,
	getAllFromDB,
	getByIdFromDB
};
