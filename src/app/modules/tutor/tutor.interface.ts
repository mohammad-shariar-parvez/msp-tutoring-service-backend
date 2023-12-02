export type ITutorFilters = {
	searchTerm?: string | undefined;
	location?: string;
	subjectId?: string;

};

export type DatabaseCourseTutor = {
	id: string;
	firstName: string;
	middleName: string | null;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	experience: string;
	bio: string;
	imageUrl: string;
	gender: string;
	location: string;
	subjectId: string;
};

// Incoming data from the backend
export type BackendCourseTutor = {
	firstName: string;
	middleName: string | null;
	lastName: string;
	experience: string;
	location: string;
	bio: string;
	imageUrl: string;
	gender: string;
	subjectId: string;
	subjects: string[];
};