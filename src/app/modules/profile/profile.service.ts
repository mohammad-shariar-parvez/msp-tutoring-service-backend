/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProfile } from "../../../interfaces/common";
import { prisma } from "../../../shared/prisma";

const insertIntoDB = async (data: Profile): Promise<Profile | null> => {

	console.log("amar data------", data);


	const result = await prisma.profile.create({
		data
	});
	if (!result) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create booking");
	}
	return result;
};


const getProfile = async (user: IProfile): Promise<Profile | null> => {
	const { userId } = user;
	console.log("USERID", userId);

	const result = await prisma.profile.findFirst({
		where: {
			userId
		}
	});
	return result;
};

const updateProfile = async (userId: string, payload: Partial<Profile>): Promise<Partial<Profile> | null> => {
	console.log("iuyaaaaaa----", userId);

	const result = await prisma.profile.update({
		where: {
			userId,
		},
		data: payload,
	});
	console.log("OOOOOOOOOOOOOOOOOOOOOOOO", result);

	if (!result) {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

	}

	return result;
};

export const ProfileService = {
	getProfile, updateProfile, insertIntoDB
};