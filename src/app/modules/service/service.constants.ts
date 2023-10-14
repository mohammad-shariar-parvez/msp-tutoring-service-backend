export const serviceFilterableFields = ['searchTerm', 'title', 'minPrice', 'maxPrice'];

export const serviceSearchableFields = ['title', 'location'];

export const serviceRelationalFileds = ['course'];

export const serviceConditionalFileds = ['minPrice', 'maxPrice'];
export const serviceConditionalFiledsMapper: { [key: string]: string; } = {
	minPrice: 'gte',
	maxPrice: 'lte'
};