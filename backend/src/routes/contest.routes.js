import express from "express"
import {validate} from "../middlewares/requestValidator.js"
import {contestValidateSchema} from "../validator/contest.validator.js"
import { asyncHandler } from "../utils/response.js"
import { createContestController } from "../controllers/contest/contest.controller.js"

const router = express.Router();

router.post("/contests", 
    validate(contestValidateSchema),
    asyncHandler(createContestController)
)

export default router