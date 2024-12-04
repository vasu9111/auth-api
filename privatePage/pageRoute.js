import middleware from "../middleware/middleware.js";
import user from "../schema/userMdl.js";
import express from "express";
const router = express.Router();

router.get("/private", middleware.verify, async (req, res) => {
  const foundUser = await user.findOne({ _id: req.user });
  const userProfile = {
    name: foundUser.name,
    email: foundUser.email,
    registeredAt: foundUser.registeredAt,
  };
  res.status(200).json(userProfile);
});

export default router;
