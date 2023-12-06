"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const bycryptHelpers_1 = require("../../../helpers/bycryptHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = require("../../../shared/prisma");
const sendResetMail_1 = require("./sendResetMail");
const signupUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = userData, userWithoutPassword = __rest(userData, ["password"]);
    const hashedPassword = yield bycryptHelpers_1.bcryptHelpers.hashedPassword(password);
    const user = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, userWithoutPassword), { password: yield hashedPassword }),
    });
    // console.log("USER IS 11111 ", user);
    if (!user) {
        // console.log("USER IS 222222 ", user);
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User already exist');
    }
    //create access token & refresh token
    const { id: userId, role, email: useEmail } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        role,
        email: useEmail
    };
});
const signinUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield bycryptHelpers_1.bcryptHelpers.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { id: userId, role, email: useEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        role,
        email: useEmail
    };
    // console.log("user signup", result);
    // console.log("login", isUserExist);
});
const oAuthUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, provider } = payLoad;
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email,
        }
    });
    if (!isUserExist) {
        const user = yield prisma_1.prisma.user.create({
            data: {
                email,
                provider
            },
        });
        //create access token & refresh token
        const { id: userId, role, email: useEmail } = user;
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            accessToken,
            refreshToken,
            role,
            email: useEmail
        };
    }
    //create access token & refresh token
    const { id: userId, role, email: useEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, useEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        role,
        email: useEmail
    };
    // console.log("user signup", result);
    // console.log("login", isUserExist);
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // console.log("TOKENNNNNNNNNNNNNNNNNNNNNNNNN", token);
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
        // console.log("varify token-------", verifiedToken);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // case- user deleted but he has refresh token
    // checking deleted user's refresh token
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: isUserExist.id,
        role: isUserExist.role,
        email: isUserExist.email
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // // checking is user exist
    // const isUserExist = await User.isUserExist(user?.userId);
    // alternative way
    // console.log("USREEEE IDD", user);
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            id: user === null || user === void 0 ? void 0 : user.userId
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield bycryptHelpers_1.bcryptHelpers.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    // hash password before saving
    const hashedPassword = yield bycryptHelpers_1.bcryptHelpers.hashedPassword(newPassword);
    try {
        const updateUser = yield prisma_1.prisma.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.userId
            },
            data: {
                password: hashedPassword
            }
        });
        return updateUser;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password update failed');
    }
});
const forgotPass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (isUserExist && isUserExist.password !== null) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Google or Github do not have password');
    }
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { id: userId } = isUserExist;
    const passResetToken = yield jwtHelpers_1.jwtHelpers.createToken({ id: userId }, config_1.default.jwt.secret, '10m');
    const resetLink = config_1.default.resetlink + `email=${payload.email}&token=${passResetToken}`;
    // console.log("passResetToken", passResetToken);
    // console.log("RESET LINK", resetLink);
    yield (0, sendResetMail_1.sendEmail)(payload.email, `
	      <div>
	        <p>Hi</p>
	        <p>Your password reset link: <a href="${resetLink}">Click Here</a></p>
	       
	        <p>Thank you</p>
	      </div>
	  `);
    // return {
    //   message: "Check your email!"
    // }
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, token } = payload;
    // console.log("TOKEN", token);
    // console.log("EMAIL", email);
    // console.log("password", newPassword);
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User email does not exist');
    }
    yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    // try {
    // 	verifiedToken = jwtHelpers.verifyToken(
    // 		token,
    // 		config.jwt.refresh_secret as Secret
    // 	);
    // 	// console.log("varify token-------", verifiedToken);
    // } catch (err) {
    // 	throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    // }
    const hashedPassword = yield bycryptHelpers_1.bcryptHelpers.hashedPassword(newPassword);
    console.log("MY HASH PASS", hashedPassword);
    try {
        const updateUser = yield prisma_1.prisma.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });
        return updateUser;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password update failed');
    }
});
exports.AuthService = {
    signupUser,
    signinUser,
    refreshToken,
    changePassword,
    resetPassword,
    forgotPass,
    oAuthUser
};
