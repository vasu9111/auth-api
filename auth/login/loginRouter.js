import express from "express";
import loginControllers from "./loginControllers.js";
import logincustommiddlewre from "../../middleware/logincustommiddlewre.js";
import middleware from "../../middleware/middleware.js";
import renewToken from "../../function/renewToken.js";
const router = express.Router();

router.post(
  "/login/custom-validation",
  logincustommiddlewre.loginValidation,
  loginControllers.loginuser
);
router.post("/logout", middleware.verify, loginControllers.logoutuser);
router.post("/refresh", middleware.verify, renewToken.renewAccessToken);
export default router;
