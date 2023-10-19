export type IUserFilters = {
	searchTerm?: string | undefined;
	role?: string;
	email?: string;
};

export type IUserSelect = {
	id: boolean;
	name: boolean;
	email: boolean;
	role: boolean;

};