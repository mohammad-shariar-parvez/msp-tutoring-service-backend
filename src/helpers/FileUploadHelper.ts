// /* eslint-disable @typescript-eslint/ban-ts-comment */

// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import config from '../config';
// // import { ICloudinaryResponse } from '../interfaces/file';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config({
// 	cloud_name: config.cloudinary.cloudName,
// 	api_key: config.cloudinary.apiKey,
// 	api_secret: config.cloudinary.apiSecret
// });
// // const storage = new CloudinaryStorage({
// // 	cloudinary,
// // 	params: {
// // 		folder: 'your_folder_name', // Optional, specify a folder in Cloudinary
// // 		format: async (req, file) => 'png', // Format to convert and store images (you can change this)
// // 	},
// // });
// const upload = multer({ storage });

// // Use in-memory storage

// console.log("UPLOAD-------", upload);


// // const uploadToCloudinary = async (file: IUploadFile): Promise<ICloudinaryResponse | undefined> => {
// // 	try {
// // 		const result = await cloudinary.uploader.upload(file?.buffer.toString('base64'), {
// // 			resource_type: 'auto' as const, // Explicitly specify the type to avoid undefined
// // 		});
// // 		//@ts-ignore
// // 		console.log("MYYYYYY RESULLLTT", result);

// // 		return result;
// // 	} catch (error) {
// // 		console.error('Error uploading to Cloudinary:', error);
// // 		return undefined; // Return a default value or handle the error as needed
// // 	}
// // };

// const uploadToCloudinary = async (file: any): Promise<any> => {
// 	// console.log("FILE PATH-----", file);

// 	return new Promise((resolve, reject) => {
// 		upload.single('image')(file, {}, (err: any) => {
// 			if (err) {
// 				return reject(err);
// 			}

// 			// Cloudinary will return the uploaded file information
// 			const { originalname, mimetype, secure_url } = file;
// 			resolve({ originalname, mimetype, secure_url });
// 		});
// 	});
// };

// export const FileUploadHelper = {
// 	uploadToCloudinary,
// 	upload
// };
