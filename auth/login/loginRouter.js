import express from "express";
import loginControllers from "./loginControllers.js";
import loginCustomMiddleware from "../../middleware/loginCustomMiddleware.js";
import middleware from "../../middleware/middleware.js";
import renewToken from "../../function/renewToken.js";
import joiSchema from "../../schema/joiSchema.js";
const router = express.Router();

router.post(
  "/custom-validation",
  loginCustomMiddleware.loginValidation,
  loginControllers.loginUser
);

router.post(
  "/joi-validation",
  middleware.validate(joiSchema.userLoginSchema),
  loginControllers.loginUser
);
router.post("/logout", middleware.verify, loginControllers.logoutUser);
router.post("/refresh", middleware.verify, renewToken.renewAccessToken);

export default router;
