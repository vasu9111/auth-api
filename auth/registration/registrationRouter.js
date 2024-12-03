import express from "express";
import registrationControllers from "./registrationControllers.js";
import registationCustomValidation from "./registation.customValidation.js";
import registrationValidation from "./registration.validation.js";
import middleware from "../../middleware/middleware.js";
const router = express.Router();

router.post(
  "/custom-validation",
  registationCustomValidation.registationCustomValidation,
  registrationControllers.registerUser
);
router.post(
  "/joi-validation",
  middleware.validate(registrationValidation.registerUser),
  registrationControllers.registerUser
);
export default router;
