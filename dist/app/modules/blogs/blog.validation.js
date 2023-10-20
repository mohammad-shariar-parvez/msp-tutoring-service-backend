"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required'
        }),
        imageUrl: zod_1.z.string({
            required_error: 'image is required'
        }),
        content: zod_1.z.string({
            required_error: 'content is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required'
        }).optional(),
        imageUrl: zod_1.z.string({
            required_error: 'image is required'
        }).optional(),
        content: zod_1.z.string({
            required_error: 'content is required'
        }).optional(),
        // Quantity must be an integer and greater than or equal to 1
    })
});
exports.BlogValidation = {
    create, update
};
