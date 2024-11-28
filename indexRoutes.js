import loginRouter from "./auth/login/loginRouter.js";
import registetion from "./auth/registetion/registetionRouter.js";
import middleware from "./middleware/middleware.js";
import renewToken from "./function/renewToken.js";
import express from "express";
import user from "./schema/userMdl.js";
import pageRouter from "./privatePage/pageRoute.js";

const router = express.Router();

router.use("/api", loginRouter);
router.use("/api/registration", registetion);
router.use("/api/private", pageRouter);

export default router;
