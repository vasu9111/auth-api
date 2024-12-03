import express from "express";
import loginControllers from "./loginControllers.js";
import loginCustomValidation from "./login.customValidation.js";
import loginValidation from "./login.validation.js";
import middleware from "../../middleware/middleware.js";
import renewToken from "../../function/renewToken.js";
const router = express.Router();

router.post(
  "/custom-validation",
  loginCustomValidation.loginCustomValidation,
  loginControllers.loginUser
);

router.post(
  "/joi-validation",
  middleware.validate(loginValidation.loginUser),
  loginControllers.loginUser
);
router.post("/logout", middleware.verify, loginControllers.logoutUser);
router.post("/refresh", middleware.verify, renewToken.renewAccessToken);

export default router;
