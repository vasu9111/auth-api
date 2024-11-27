import express from "express";
import loginControllers from "./loginControllers.js";

const router = express.Router();

router.post("/auth", loginControllers.loginuser);

export default router;
