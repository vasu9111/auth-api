import express from "express";
import registetionControllers from "./registetionControllers.js";
import registetioncoustommiddleware from "../middleware/registetioncoustommiddleware.js";

const router = express.Router();

router.post(
  "/custom-validation",
  registetioncoustommiddleware.registrationValidation,
  registetionControllers.postregistetion
);

export default router;
