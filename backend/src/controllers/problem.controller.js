import { successResponse, errorResponse } from '../utils/response.js';

export const getProblems = async (req, res, next) => {
  try {
    successResponse(res, 'Problems fetched successfully', []);
  } catch (error) {
    next(error);
  }
};
