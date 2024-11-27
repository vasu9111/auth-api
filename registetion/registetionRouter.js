import express from "express";
import registetionControllers from "./registetionControllers.js";

const router = express.Router();

router.post("/add", registetionControllers.postregistetion);

export default router;
