// src/routes/index.js
import express from "express";

import userRouter from "./user.routes.js";
import contestRouter from "./contest.routes.js";
import problemRouter from "./problem.routes.js";

const router = express.Router();

router.use("/v1", userRouter);
router.use("/v1", contestRouter);
router.use("/v1", problemRouter);

export default router;
