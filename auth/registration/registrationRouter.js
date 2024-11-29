import express from "express";
import registrationControllers from "./registrationControllers.js";
import registrationCustomMiddleware from "../../middleware/registrationCustomMiddleware.js";
import middleware from "../../middleware/middleware.js";
import joiSchema from "../../schema/joiSchema.js";
const router = express.Router();

router.post(
  "/custom-validation",
  registrationCustomMiddleware.registrationValidation,
  registrationControllers.userRegistration
);
router.post(
  "/joi-validation",
  middleware.validate(joiSchema.userRegisterSchema),
  registrationControllers.userRegistration
);
export default router;
