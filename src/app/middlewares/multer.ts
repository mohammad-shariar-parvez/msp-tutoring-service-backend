// import { Request } from 'express'; // Assuming you are using Express
// import multer, { FileFilterCallback } from 'multer';
// import path from 'path';

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


import multer from 'multer';

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single('file');

export default singleUpload;

