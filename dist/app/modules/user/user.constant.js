"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelect = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    'searchTerm',
    'role',
    'email',
];
exports.userSearchableFields = [
    'email',
    'role',
];
exports.userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
};
