
export const courseSearchableFields = ['title', 'location',];

export const courseFilterableFields = ['searchTerm', 'searchTerm2', 'title', 'minPrice', 'maxPrice', 'status', 'categoryId', 'location'];


export const courseRelationalFileds = ['categoryId'];

export const courseRelationalFiledsMapper: { [key: string]: string; } = {
	categoryId: 'category'
};

export const courseConditionalFileds = ['minPrice', 'maxPrice'];
export const courseConditionalFiledsMapper: { [key: string]: string; } = {
	minPrice: 'gte',
	maxPrice: 'lte'
};