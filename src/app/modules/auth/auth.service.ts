
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { bcryptHelpers } from "../../../helpers/bycryptHelpers";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import { IChangePassword, ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { sendEmail } from "./sendResetMail";

const signupUser = async (
	userData: any
): Promise<ILoginUserResponse> => {
	const { password, ...userWithoutPassword } = userData;

	const hashedPassword = await bcryptHelpers.hashedPassword(password);

	const user = await prisma.user.create({
		data: {
			...userWithoutPassword,
			password: await hashedPassword,
		},
	});
	console.log("USER IS 11111 ", user);

	if (!user) {
		console.log("USER IS 222222 ", user);
		throw new ApiError(httpStatus.NOT_FOUND, 'User already exist');
	}
	//create access token & refresh token
	const { id: userId, role, email: useEmail } = user;
	const accessToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);
	const refreshToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.refresh_secret as Secret,
		config.jwt.refresh_expires_in as string
	);

	return {
		accessToken,
		refreshToken,
		role,
		email: useEmail
	};

};

const signinUser = async (
	payload: ILoginUser
): Promise<ILoginUserResponse> => {
	const { email, password } = payload;

	const isUserExist = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	if (
		isUserExist.password &&
		!(await bcryptHelpers.isPasswordMatched(password, isUserExist.password))
	) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
	}
	//create access token & refresh token
	const { id: userId, role, email: useEmail } = isUserExist;
	const accessToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);
	const refreshToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.refresh_secret as Secret,
		config.jwt.refresh_expires_in as string
	);

	return {
		accessToken,
		refreshToken,
		role,
		email: useEmail
	};
	// console.log("user signup", result);
	// console.log("login", isUserExist);


};
const oAuthUser = async (
	payLoad: { email: string, provider: boolean; }
): Promise<ILoginUserResponse> => {
	const { email, provider } = payLoad;



	const isUserExist = await prisma.user.findUnique({
		where: {
			email,

		}
	});
	if (!isUserExist) {
		const user = await prisma.user.create({
			data: {
				email,
				provider


			},
		});
		//create access token & refresh token
		const { id: userId, role, email: useEmail } = user;
		const accessToken = jwtHelpers.createToken(
			{ userId, role, useEmail },
			config.jwt.secret as Secret,
			config.jwt.expires_in as string
		);
		const refreshToken = jwtHelpers.createToken(
			{ userId, role, useEmail },
			config.jwt.refresh_secret as Secret,
			config.jwt.refresh_expires_in as string
		);
		return {
			accessToken,
			refreshToken,
			role,
			email: useEmail
		};
	}


	//create access token & refresh token
	const { id: userId, role, email: useEmail } = isUserExist;
	const accessToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);
	const refreshToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.refresh_secret as Secret,
		config.jwt.refresh_expires_in as string
	);

	return {
		accessToken,
		refreshToken,
		role,
		email: useEmail
	};
	// console.log("user signup", result);
	// console.log("login", isUserExist);


};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
	//verify token
	console.log("TOKENNNNNNNNNNNNNNNNNNNNNNNNN", token);

	let verifiedToken = null;
	try {
		verifiedToken = jwtHelpers.verifyToken(
			token,
			config.jwt.refresh_secret as Secret
		);
		// console.log("varify token-------", verifiedToken);

	} catch (err) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
	}

	const { userId } = verifiedToken;

	// case- user deleted but he has refresh token
	// checking deleted user's refresh token


	const isUserExist = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}
	//generate new token
	const newAccessToken = jwtHelpers.createToken(
		{
			id: isUserExist.id,
			role: isUserExist.role,
			email: isUserExist.email
		},
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);

	return {
		accessToken: newAccessToken,
	};
};


const changePassword = async (
	user: JwtPayload | null,
	payload: IChangePassword
): Promise<User> => {
	const { oldPassword, newPassword } = payload;

	// // checking is user exist
	// const isUserExist = await User.isUserExist(user?.userId);

	// alternative way
	// console.log("USREEEE IDD", user);

	const isUserExist = await prisma.user.findUnique({
		where: {
			id: user?.userId
		}
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// checking old password
	if (
		isUserExist.password &&
		!(await bcryptHelpers.isPasswordMatched(oldPassword, isUserExist.password))
	) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
	}

	// hash password before saving
	const hashedPassword = await bcryptHelpers.hashedPassword(newPassword);
	try {
		const updateUser = await prisma.user.update({
			where: {
				id: user?.userId
			},
			data: {
				password: hashedPassword
			}
		});
		return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed');
	}

};

const forgotPass = async (payload: { email: string; }) => {

	const isUserExist = await prisma.user.findUnique({
		where: {
			email: payload.email
		}
	});

	if (isUserExist && isUserExist.password !== null) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Google or Github do not have password');
	}
	if (!isUserExist) {

		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}


	const { id: userId } = isUserExist;

	const passResetToken = await jwtHelpers.createToken({ id: userId }, config.jwt.secret as string, '10m');

	const resetLink: string = config.resetlink + `email=${payload.email}&token=${passResetToken}`;

	console.log("passResetToken", passResetToken);
	console.log("RESET LINK", resetLink);


	await sendEmail(payload.email, `
	      <div>
	        <p>Hi</p>
	        <p>Your password reset link: <a href="${resetLink}">Click Here</a></p>
	       
	        <p>Thank you</p>
	      </div>
	  `);

	// return {
	//   message: "Check your email!"
	// }
};

const resetPassword = async (payload: { email: string, newPassword: string; token: string; }) => {

	const { email, newPassword, token } = payload;
	console.log("TOKEN", token);
	console.log("EMAIL", email);
	console.log("password", newPassword);

	const isUserExist = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User email does not exist');
	}

	await jwtHelpers.verifyToken(token, config.jwt.secret as string);

	// try {
	// 	verifiedToken = jwtHelpers.verifyToken(
	// 		token,
	// 		config.jwt.refresh_secret as Secret
	// 	);
	// 	// console.log("varify token-------", verifiedToken);

	// } catch (err) {
	// 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
	// }

	const hashedPassword = await bcryptHelpers.hashedPassword(newPassword);
	console.log("MY HASH PASS", hashedPassword);

	try {
		const updateUser = await prisma.user.update({
			where: {
				email
			},
			data: {
				password: hashedPassword
			}
		});
		return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed');
	}
};


export const AuthService = {
	signupUser,
	signinUser,
	refreshToken,
	changePassword,
	resetPassword,
	forgotPass,
	oAuthUser
};
