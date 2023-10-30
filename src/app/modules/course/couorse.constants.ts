
export const courseSearchableFields = ['title', 'location',];

export const courseFilterableFields = ['searchTerm', 'searchTerm2', 'title', 'minPrice', 'maxPrice', 'status', 'serviceId', 'location'];


export const courseRelationalFileds = ['serviceId'];

export const courseRelationalFiledsMapper: { [key: string]: string; } = {
	serviceId: 'service'
};

export const courseConditionalFileds = ['minPrice', 'maxPrice'];
export const courseConditionalFiledsMapper: { [key: string]: string; } = {
	minPrice: 'gte',
	maxPrice: 'lte'
};