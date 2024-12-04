import authRouter from "./components/auth/auth.route.js";
import express from "express";
import pageRouter from "./privatePage/pageRoute.js";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/page", pageRouter);

export default router;
