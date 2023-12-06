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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const prisma_1 = require("../../shared/prisma");
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token
        const token = req.headers.authorization;
        // console.log("TUTOR TOKEN", req.headers);
        // console.log("TUTOR TOKEN AUTH", req.headers.authorization);
        //Check whether token exist 
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        // console.log("from auth----______________--", verifiedUser);
        req.user = verifiedUser; // role  , userid ,email
        //Check whether valid user exist on database
        // case- user deleted but he has refresh token
        // checking deleted user's refresh token
        // console.log("VARIFIED++++++++++++++++", verifiedUser);
        const isUserExist = yield prisma_1.prisma.user.findUnique({
            where: {
                id: verifiedUser.userId
            }
        });
        // console.log("IS USER-----------", verifiedUser);
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Token user does not exist in Database');
        }
        //Check whether valid Role exist on database 
        // console.log("requiredRoles------", requiredRoles);
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
