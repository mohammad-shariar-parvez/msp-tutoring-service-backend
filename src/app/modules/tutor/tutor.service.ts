

import { CourseTutor, Prisma, SubjectTutor } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { tutorSearchableFields } from "./tutor.constant";
import { BackendCourseTutor, ITutorFilters } from "./tutor.interface";



const insertIntoDB = async (
	data: BackendCourseTutor
): Promise<any> => {
	// console.log("REAL DATAAAAAA++++++++", data);
	const { subjects, ...tutorDetails } = data;



	const newTutor = await prisma.$transaction(async (transactionClient) => {
		const result = await transactionClient.courseTutor.create({
			data: tutorDetails
		});


		if (!result) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Tutor");
		}

		if (subjects && subjects.length > 0) {

			//------
			await asyncForEach(
				subjects,
				async (subjectId: string) => {

					// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
					const createTutorResult = await transactionClient.subjectTutor.create({

						data: {
							courseTutorId: result.id,
							subjectId
						}

					});
					// console.log("createPrerequisite", createTutorResult);
				}
			);
		}

		return result;
	});

	if (newTutor) {
		const responseData = await prisma.subjectTutor.findMany({
			where: {
				courseTutorId: newTutor.id
			},
			include: {
				subject: true,
				courseTutor: true

			}
		});

		return responseData;
	}


};

const getAllFromDB = async (
	filters: ITutorFilters,
	options: IPaginationOptions

): Promise<IGenericResponse<Partial<CourseTutor>[]>> => {
	const { limit, page, skip, sortBy, sortOrder, } = paginationHelpers.calculatePagination(options);
	const { searchTerm, subjectId, ...filterData } = filters;
	// console.log("MY LOCATOIN", subjectId);

	// Extract searchTerm to implement search query

	const andConditions = [];
	// console.log("SEARCH----", filters);
	// console.log("OPtions----", options);
	if (subjectId) {
		// Add condition to filter courses based on the location
		andConditions.push({
			subjects: {
				some: {
					subjectId: {
						contains: subjectId,
						mode: 'insensitive'
					}
				}
			}
		});
	}

	// console.log("MY AND", andConditions);
	if (searchTerm) {
		andConditions.push({
			OR: tutorSearchableFields.map((field) => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive'
				}
			}))
		});
	}


	if (Object.keys(filterData).length) {
		andConditions.push({

			AND: Object.entries(filterData).map(([key, value]) => {
				return {
					[key]: {
						equals: value,
						mode: 'insensitive'
					}
				};

			})
		});
	}


	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const whereConditons: Prisma.CourseTutorWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};
	// console.log(whereConditons);


	const result = await prisma.courseTutor.findMany({
		skip,
		take: limit,
		where: whereConditons,
		include: {
			subjects: true
		},
		orderBy: { [sortBy]: sortOrder },
	});
	const total = await prisma.courseTutor.count({
		where: whereConditons
	});
	return {
		meta: {
			total,
			page,
			limit
		},
		data: result
	};
};


const getByIdFromDB = async (id: string): Promise<Partial<CourseTutor> | null> => {
	const result = await prisma.courseTutor.findUniqueOrThrow({
		where: {
			id,
		},
		include: {
			subjects: {
				include: {
					courseTutor: true,
					subject: true
				}
			}
		},
	});

	return result;
};

const updateOneInDB = async (id: string, payload: Partial<BackendCourseTutor>): Promise<Partial<SubjectTutor[]> | null> => {

	const { subjects, ...tutorsData } = payload;

	const updateTutor = await prisma.$transaction(async (transactionClient) => {
		const updateTutorResult = await transactionClient.courseTutor.update({

			where: {
				id,
			},
			data: tutorsData,
		});

		if (!updateTutorResult) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update Tutor");
		}
		// Delete existing subject-tutor associations
		await transactionClient.subjectTutor.deleteMany({
			where: { courseTutorId: id },
		});

		if (subjects && subjects.length > 0) {

			//------
			await asyncForEach(
				subjects,
				async (subjectId: string) => {

					// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
					const createTutorResult = await transactionClient.subjectTutor.create({

						data: {
							courseTutorId: id,
							subjectId
						}

					});
					// console.log("createPrerequisite", createTutorResult);
				}
			);
		}

		return updateTutorResult;
	});


	const responseData = await prisma.subjectTutor.findMany({
		where: {
			courseTutorId: updateTutor.id
		}
	});

	return responseData;


};
const deleteByIdFromDB = async (id: string): Promise<Partial<CourseTutor> | null> => {

	// return result;

	const newDeletedBooking = await prisma.$transaction(async (transactionClient) => {


		// const findTutor = await transactionClient.subjectTutor.findFirst({
		// 	where: {
		// 		courseTutorId: id
		// 	}
		// });



		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const deletedFromSubjetTutor = await transactionClient.subjectTutor.deleteMany({
			where: {
				courseTutorId: id
			}
		});


		// console.log("deletepayment===============", deletedFromSubjetTutor);

		// if (deletedFromSubjetTutor?.count == 0) {
		// 	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to Delete from SubjetTutor Database");
		// }

		const deletedTutor = await transactionClient.courseTutor.delete({
			where: {
				id,
			}
		});

		// console.log("delete bbooking", deletedTutor);

		return deletedTutor;
	});


	return newDeletedBooking;




};



export const TutorService = {
	insertIntoDB,
	getAllFromDB,
	getByIdFromDB,
	updateOneInDB,
	deleteByIdFromDB,
};