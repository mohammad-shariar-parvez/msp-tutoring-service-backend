/* eslint-disable no-undef */
import { v2 as cloudinary } from 'cloudinary';

import getDataUri from './dataUri';

const uploadToCloudinary = async (
	avatar: Express.Multer.File | undefined,
	folder: string
) => {
	try {
		let uploadedImageInfo = null;

		if (avatar) {
			const fileUri = getDataUri(avatar);
			// console.log("fileURL", fileUri);

			const result = await cloudinary.uploader.upload(fileUri, {
				folder: folder,
			});

			uploadedImageInfo = {
				publicId: result.public_id,
				photoUrl: result.secure_url,
			};
		}

		return uploadedImageInfo;
	} catch (error) {
		console.log("CHEEEEEEELLLLL", error);

		throw new Error('Error uploading avatar to Cloudinary',);
	}
};

const deleteFromCloudinary = async (publicId: string): Promise<void> => {
	try {
		await cloudinary.uploader.destroy(publicId);
	} catch (error) {
		throw new Error('Error uploading avatar to Cloudinary');
	}
};

export const cloudinaryHelper = {
	uploadToCloudinary,
	deleteFromCloudinary,
};