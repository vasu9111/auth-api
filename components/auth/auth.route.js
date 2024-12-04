import express from "express";
import authControllers from "./auth.controllers.js";
import authCustomValidation from "./auth.customValidation.js";
import authValidation from "./auth.validation.js";
import middleware from "../../middleware/middleware.js";
import renewToken from "../../function/renewToken.js";
const router = express.Router();
// login Router
router.post(
  "/login/custom-validation",
  authCustomValidation.loginCustomValidation,
  authControllers.loginUser
);

router.post(
  "/login/joi-validation",
  middleware.validate(authValidation.loginUser),
  authControllers.loginUser
);

// registation Router
router.post(
  "/registration/custom-validation",
  authCustomValidation.registationCustomValidation,
  authControllers.registerUser
);
router.post(
  "/registration/joi-validation",
  middleware.validate(authValidation.registerUser),
  authControllers.registerUser
);
router.post("/logout", middleware.verify, authControllers.logoutUser);
router.post("/refresh", renewToken.renewAccessToken);
export default router;
