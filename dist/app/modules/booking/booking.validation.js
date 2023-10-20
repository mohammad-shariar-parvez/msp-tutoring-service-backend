"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            required_error: 'Book ID is required'
        }),
        startDate: zod_1.z.string({
            required_error: 'startTime is required'
        }),
        startTime: zod_1.z.string({
            required_error: 'startTime is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...Object.values(client_1.Status)], {}).optional(),
    }),
    startDate: zod_1.z.string({
        required_error: 'startTime is required'
    }).optional(),
    startTime: zod_1.z.string({
        required_error: 'startTime is required'
    }).optional(),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema
};
