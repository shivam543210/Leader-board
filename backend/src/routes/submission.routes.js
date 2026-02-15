import express from 'express';
import * as submissionController from '../controllers/submission.controller.js';
import {submitValidateSchema} from '../validator/submit.validator.js'
import {validate} from '../middlewares/requestValidator.js'
import { asyncHandler } from '../utils/response.js';
const router = express.Router();

router.post('/submit',validate(submitValidateSchema), 
asyncHandler(submissionController.createSubmission));

export default router;
