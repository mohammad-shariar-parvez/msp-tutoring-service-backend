
export type IReview = {
	courseId: string;
	userId: string,
	rating: number,
	review: string;

};


export type IUserSelect = {
	id: boolean;
	name: boolean;
	email: boolean;
	role: boolean;
	contactNo: boolean;
	address: boolean;
	profileImg: boolean;
};

export type IReviewFilterRequest = {
	courseId?: string;
};
