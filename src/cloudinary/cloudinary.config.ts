import { v2 as cloudinary } from 'cloudinary';

import config from '../config';





const Cloudinary = () => {
	cloudinary.config({
		cloud_name: config.cloudinary.cloudName,
		api_key: config.cloudinary.apiKey,
		api_secret: config.cloudinary.apiSecret,
	});
};

export default Cloudinary;