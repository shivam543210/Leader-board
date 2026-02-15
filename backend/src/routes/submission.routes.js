import express from 'express';
import {submitController} from '../controllers/submission/submission.controller.js';
import {submitValidateSchema} from '../validator/submit.validator.js'
import {validate} from '../middlewares/requestValidator.js'
import { asyncHandler } from '../utils/response.js';
const router = express.Router();

router.post('/submit',validate(submitValidateSchema), 
asyncHandler(submitController));

export default router;
