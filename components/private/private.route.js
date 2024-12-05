import express from "express";
import privateController from "./private.controller.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

router.get("/private", middleware.verify, privateController.privateuser);

export default router;
