"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseConditionalFiledsMapper = exports.courseConditionalFileds = exports.courseRelationalFiledsMapper = exports.courseRelationalFileds = exports.courseFilterableFields = exports.courseSearchableFields = void 0;
exports.courseSearchableFields = ['title', 'location',];
exports.courseFilterableFields = ['searchTerm', 'title', 'minPrice', 'maxPrice', 'status', 'serviceId'];
exports.courseRelationalFileds = ['serviceId'];
exports.courseRelationalFiledsMapper = {
    serviceId: 'service'
};
exports.courseConditionalFileds = ['minPrice', 'maxPrice'];
exports.courseConditionalFiledsMapper = {
    minPrice: 'gte',
    maxPrice: 'lte'
};
