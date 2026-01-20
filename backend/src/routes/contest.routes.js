import express from 'express';
import * as contestController from '../controllers/contest.controller.js';

const router = express.Router();

router.get('/', contestController.getContests);

export default router;
