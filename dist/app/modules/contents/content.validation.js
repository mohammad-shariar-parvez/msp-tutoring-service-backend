"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: 'question is required'
        }),
        answer: zod_1.z.string({
            required_error: 'answer is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: 'question is required'
        }).optional(),
        answer: zod_1.z.string({
            required_error: 'answer is required'
        }).optional(),
        // Quantity must be an integer and greater than or equal to 1
    })
});
exports.BlogValidation = {
    create, update
};
