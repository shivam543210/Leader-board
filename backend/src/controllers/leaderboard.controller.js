import { successResponse, errorResponse } from '../utils/response.js';
import * as leaderboardService from '../services/leaderboard.service.js';

export const getLeaderboard = async (req, res, next) => {
  try {
    // const data = await leaderboardService.getLeaderboard();
    successResponse(res, 'Leaderboard fetched successfully', []);
  } catch (error) {
    next(error);
  }
};
