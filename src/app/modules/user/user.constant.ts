import { IUserSelect } from "./user.interface";

export const userFilterableFields = [
	'searchTerm',
	'role',
	'email',
	'contactNo',
];

export const userSearchableFields = [
	'email',
	'role',
	'address',
	'contactNo',
	'name.fisrtName',
	'name.middleName',
	'name.lastName',
];


export const userSelect: IUserSelect = {
	id: true,
	name: true,
	email: true,
	role: true,

};