import express from "express";
import loginControllers from "./loginControllers.js";
import logincustommiddlewre from "../middleware/logincustommiddlewre.js";

const router = express.Router();

router.post(
  "/custom-validation",
  logincustommiddlewre.loginValidation,
  loginControllers.loginuser
);

export default router;
