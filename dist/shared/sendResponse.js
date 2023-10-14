"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendloginResponse = void 0;
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
const sendloginResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        meta: data.meta || null || undefined,
        token: data.token || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.sendloginResponse = sendloginResponse;
exports.default = sendResponse;
