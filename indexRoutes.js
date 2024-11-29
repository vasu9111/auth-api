import loginRouter from "./auth/login/loginRouter.js";
import registration from "./auth/registration/registrationRouter.js";

import express from "express";

import pageRouter from "./privatePage/pageRoute.js";

const router = express.Router();

router.use("/api/login", loginRouter);
router.use("/api/registration", registration);
router.use("/api/private", pageRouter);

export default router;
