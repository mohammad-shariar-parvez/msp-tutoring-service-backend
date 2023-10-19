
export const courseSearchableFields = ['title', 'location',];

export const courseFilterableFields = ['searchTerm', 'title', 'minPrice', 'maxPrice', 'status', 'serviceId'];


export const courseRelationalFileds = ['serviceId'];

export const courseRelationalFiledsMapper: { [key: string]: string; } = {
	serviceId: 'service'
};

export const courseConditionalFileds = ['minPrice', 'maxPrice'];
export const courseConditionalFiledsMapper: { [key: string]: string; } = {
	minPrice: 'gte',
	maxPrice: 'lte'
};