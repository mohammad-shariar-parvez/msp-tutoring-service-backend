"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            required_error: 'courseId ID is required'
        }),
        review: zod_1.z.string({
            required_error: 'review is required'
        }),
        rating: zod_1.z.number({
            required_error: 'rating is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
exports.ReviewValidation = {
    create
};
