import express from 'express';
import * as problemController from '../controllers/problem.controller.js';

const router = express.Router();

router.get('/', problemController.getProblems);

export default router;
