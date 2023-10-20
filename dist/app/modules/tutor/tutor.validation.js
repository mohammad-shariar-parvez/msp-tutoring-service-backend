"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorValidation = void 0;
const zod_1 = require("zod");
const createTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string(),
        middleName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        experience: zod_1.z.string(),
        bio: zod_1.z.string(),
        imageUrl: zod_1.z.string(),
        gender: zod_1.z.string(),
    }),
});
const updateTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
    }),
});
exports.tutorValidation = {
    createTutorZodSchema,
    updateTutorZodSchema
};
