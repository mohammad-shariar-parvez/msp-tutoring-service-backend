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
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("amar data------", data);
    const result = yield prisma_1.prisma.profile.create({
        data
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create booking");
    }
    return result;
});
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    console.log("USERID", userId);
    const result = yield prisma_1.prisma.profile.findFirst({
        where: {
            userId
        }
    });
    return result;
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("iuyaaaaaa----", userId);
    const result = yield prisma_1.prisma.profile.update({
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
});
exports.ProfileService = {
    getProfile, updateProfile, insertIntoDB
};
