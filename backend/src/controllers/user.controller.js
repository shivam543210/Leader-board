import { successResponse, errorResponse } from '../utils/response.js';

export const getUsers = async (req, res, next) => {
  try {
    // Logic to get users
    successResponse(res, 'Users fetched successfully', []);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
     // Logic to get user by id
    successResponse(res, 'User fetched successfully', {});
  } catch (error) {
    next(error);
  }
};
