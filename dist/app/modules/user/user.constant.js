"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelect = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    'searchTerm',
    'role',
    'email',
    'contactNo',
];
exports.userSearchableFields = [
    'email',
    'role',
    'address',
    'contactNo',
    'name.fisrtName',
    'name.middleName',
    'name.lastName',
];
exports.userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
};
