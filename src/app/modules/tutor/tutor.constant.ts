import { IUserSelect } from "./tutor.interface";

export const tutorFilterableFields = [
	'searchTerm',
	'role',
	'email',
];

export const tutorSearchableFields = [
	'email',
	'role',

];


export const userSelect: IUserSelect = {
	id: true,
	name: true,
	email: true,
	role: true,

};