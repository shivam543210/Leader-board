import express from "express"
import { validate } from "../middlewares/requestValidator.js"
import { registrationSchema, LoginSchema } from "../validator/auth.validator.js"
import { asyncHandler } from "../utils/response.js";
import {createUser , login} from "../controllers/authFolder/Register.js"


const router = express.Router();

router.post("/register",
    validate(registrationSchema),
    asyncHandler(createUser)
    
)
router.post("/login", 
    validate(LoginSchema),
    asyncHandler(login))

export default router   