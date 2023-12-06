"use strict";
// import { Request } from 'express'; // Assuming you are using Express
// import multer, { FileFilterCallback } from 'multer';
// import path from 'path';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // eslint-disable-next-line no-undef
// type CustomFile = Express.Multer.File;
// export default multer({
// 	storage: multer.diskStorage({}),
// 	limits: {
// 		fileSize: 2000000,
// 	},
// 	fileFilter: (_req: Request, file: CustomFile, cb: FileFilterCallback) => {
// 		const ext = path.extname(file.originalname);
// 		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
// 			const error: Error = new Error('File type is not supported');
// 			cb(error as unknown as null, false);
// 			return;
// 		}
// 		cb(null, true);
// 	},
// });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const singleUpload = (0, multer_1.default)({ storage }).single('file');
exports.default = singleUpload;
