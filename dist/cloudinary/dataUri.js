"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const getDataUri = (file) => {
    const parser = new parser_1.default();
    const extName = path_1.default.extname(file.originalname).toString();
    parser.format(extName, file.buffer);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fileUri = parser.content;
    return fileUri;
};
exports.default = getDataUri;
