import { successResponse, errorResponse } from '../utils/response.js';
import * as submissionService from '../services/submission.service.js';

export const createSubmission = async (req, res, next) => {
  try {
    // const submission = await submissionService.createSubmission(req.body);
    successResponse(res, 'Submission created successfully', {});
  } catch (error) {
    next(error);
  }
};
