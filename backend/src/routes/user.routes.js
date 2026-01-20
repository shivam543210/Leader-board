import express from "express"
import { validate } from "../middlewares/requestValidator.js"
import { registrationSchema } from "../validator/auth.validator.js"
import { asyncHandler } from "../utils/response.js";
import {createUser } from "../controllers/authFolder/Register.js"
const router = express.Router();

router.post("/register",
    validate(registrationSchema),
    asyncHandler(createUser)
    
)
export default router   