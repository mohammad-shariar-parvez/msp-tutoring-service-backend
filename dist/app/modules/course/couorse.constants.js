"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseConditionalFiledsMapper = exports.courseConditionalFileds = exports.courseRelationalFiledsMapper = exports.courseRelationalFileds = exports.courseFilterableFields = exports.courseSearchableFields = void 0;
exports.courseSearchableFields = ['title', 'location',];
exports.courseFilterableFields = ['searchTerm', 'searchTerm2', 'title', 'minPrice', 'maxPrice', 'status', 'categoryId', 'location'];
exports.courseRelationalFileds = ['categoryId'];
exports.courseRelationalFiledsMapper = {
    categoryId: 'category'
};
exports.courseConditionalFileds = ['minPrice', 'maxPrice'];
exports.courseConditionalFiledsMapper = {
    minPrice: 'gte',
    maxPrice: 'lte'
};
