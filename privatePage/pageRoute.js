import middleware from "../middleware/middleware.js";
import user from "../schema/userMdl.js";
import express from "express";
const router = express.Router();

router.get("/", middleware.verify, async (req, res) => {
  const finduser = await user.findOne({ _id: req.user });

  res.status(200).json({ message: `hello ${finduser.email} login` });
});

export default router;