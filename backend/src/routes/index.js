// src/routes/index.js
import express from "express";

import userRouter from "./user.routes.js";
import contestRouter from "./contest.routes.js";
import problemRouter from "./problem.routes.js";
import submissionRouter from "./submission.routes.js";
import leaderboardRouter from "./leaderboard.routes.js";

const router = express.Router();

router.use("/v1", userRouter);
router.use("/v1", contestRouter);
router.use("/v1", problemRouter);
router.use("/v1", submissionRouter);
router.use("/v1", leaderboardRouter);

export default router;
