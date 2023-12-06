"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    frontEnd_url: process.env.FRONTEND_URL,
    database_url: process.env.DATABASE_URL,
    default_user_pass: process.env.DEFAULT_USER_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    ssl: {
        storeId: process.env.STORE_ID,
        storePass: process.env.STORE_PASS,
        sslPaymentUrl: process.env.SSL_BASE_PAYMENT_URL,
        sslValidationUrl: process.env.SSL_BASE_VALIDATION_URL
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    resetlink: process.env.RESET_PASS_UI_LINK,
    email: process.env.EMAIL,
    appPass: process.env.APP_PASS
};
