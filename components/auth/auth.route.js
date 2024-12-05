import express from "express";
import authController from "./auth.controller.js";
import authCustomValidation from "./auth.customValidation.js";
import authValidation from "./auth.validation.js";
import middleware from "../../middleware/middleware.js";
import authHelper from "../../helper/authHelper.js";
const router = express.Router();
// login Router
router.post(
  "/login/custom-validation",
  authCustomValidation.loginCustomValidation,
  authController.loginUser
);

router.post(
  "/login/joi-validation",
  middleware.validate(authValidation.loginUser),
  authController.loginUser
);

// registation Router
router.post(
  "/registration/custom-validation",
  authCustomValidation.registationCustomValidation,
  authController.registerUser
);
router.post(
  "/registration/joi-validation",
  middleware.validate(authValidation.registerUser),
  authController.registerUser
);

router.post("/registration/db-validation", authController.registerUser);

router.post("/logout", middleware.verify, authController.logoutUser);
router.post("/refresh", authHelper.renewAccessToken);
export default router;
