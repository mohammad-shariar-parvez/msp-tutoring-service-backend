
export const courseSearchableFields = ['title'];

export const courseFilterableFields = ['searchTerm', 'title'];


export const courseRelationalFileds = ['serviceId'];

export const courseRelationalFiledsMapper: { [key: string]: string; } = {
	serviceId: 'service'
};