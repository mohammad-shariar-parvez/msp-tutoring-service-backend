import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";



import { subjectFilterableFields } from "./subject.constants";
import { SubjectService } from "./subject.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SubjectService.insertIntoDB(req.body);
    // console.log("REEESULTT", result);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subject created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, subjectFilterableFields);

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SubjectService.getAllFromDB(options, filters);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subject fetched successfully!",
        meta: result.meta,
        data: result.data
    });
});



const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {


    const { id } = req.params;

    const result = await SubjectService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject fetched successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;


    const result = await SubjectService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubjectService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject delete successfully',
        data: result
    });
});


export const SubjectController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
};