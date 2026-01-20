import { successResponse, errorResponse } from '../utils/response.js';

export const getContests = async (req, res, next) => {
  try {
    successResponse(res, 'Contests fetched successfully', []);
  } catch (error) {
    next(error);
  }
};
