import express from "express"
import {validate} from "../middlewares/requestValidator.js"
import {problemValidateSchema,problemManyValidation} from "../validator/problem.Validator.js"
import { asyncHandler } from "../utils/response.js"
import { createContestProblemController,createManyContestProblemController } from "../controllers/problems/problem.controller.js"
const router = express.Router();

router.post("/problem", 
    validate(problemValidateSchema),
    asyncHandler(createContestProblemController)   
)
router.post("/problems",
    validate(problemManyValidation),
    asyncHandler(createManyContestProblemController)
)

export default router
