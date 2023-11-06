
import axios from 'axios';

import httpStatus from "http-status";
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config';
import ApiError from "../../../errors/ApiError";



const initPayment = async (payload: any) => {


	try {
		const data = {
			store_id: config.ssl.storeId,
			store_passwd: config.ssl.storePass,
			total_amount: payload.total_amount,
			currency: 'BDT',
			tran_id: uuidv4(), // use unique tran_id for each api call
			success_url: 'http://localhost:5010/api/v1/payments/success',
			fail_url: 'http://localhost:5010/api/v1/payments/fail',
			cancel_url: 'http://localhost:5010/api/v1/payments/cancel',
			ipn_url: 'http://localhost:5010/api/v1/payments/ipn',
			shipping_method: 'N/A',
			course_name: payload.course_name,
			course_category: 'Payment',
			product_profile: 'User',
			cus_email: payload.cus_email,
			cus_add1: 'Natore',
			cus_city: 'Dhaka',
			cus_state: 'Dhaka',
			cus_postcode: '1000',
			cus_country: 'Bangladesh',
			cus_fax: '01711111111',
			ship_name: 'Customer Name',
			ship_add1: 'Dhaka',
			ship_add2: 'Dhaka',
			ship_city: 'Dhaka',
			ship_state: 'Dhaka',
			ship_postcode: 1000,
			ship_country: 'Bangladesh',
		};
		// console.log("DAAATTTTAAA__________ ++", data);

		const response = await axios({
			method: 'post',
			url: config.ssl.sslPaymentUrl,
			data: data,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		// console.log("Payment RESPONSE", response);
		const tranData = data?.tran_id;

		return { ...response.data, tranData };
	}
	catch (err) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Payment error");
	}
};

const validate = async (data: any) => {
	console.log(data);

	try {
		const response = await axios({
			method: 'GET',
			url: `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
			// url: config.ssl.sslPaymentUrl
		});
		// console.log("VALIDATE------", response);
		// console.log("URL", `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`);

		// console.log("RESPONSE---------------------", response.data);


		return response.data;
	}
	catch (err) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Payment error");
	}
};

export const sslService = {
	initPayment,
	validate
};