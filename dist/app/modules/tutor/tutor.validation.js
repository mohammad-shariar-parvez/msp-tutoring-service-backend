"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorValidation = void 0;
const zod_1 = require("zod");
const createTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: "firstName is required"
        }),
        middleName: zod_1.z.string().nullable().optional(),
        lastName: zod_1.z.string({
            required_error: "lastName is required"
        }),
        experience: zod_1.z.string({
            required_error: "experience is required"
        }),
        bio: zod_1.z.string({
            required_error: "bio is required"
        }),
        imageUrl: zod_1.z.string({
            required_error: "imageUrl is required"
        }),
        gender: zod_1.z.string({
            required_error: "gender is required"
        }),
        location: zod_1.z.string({
            required_error: "location is required"
        }),
        subjects: zod_1.z.array(zod_1.z.string({
            required_error: "At least one subject is required"
        })),
    }),
});
const updateTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().nullable().optional(),
        lastName: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        subjects: zod_1.z.array(zod_1.z.string()).optional(), // Add the new subjects array field
    }),
});
exports.tutorValidation = {
    createTutorZodSchema,
    updateTutorZodSchema
};
