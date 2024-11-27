import loginRouter from "./login/loginRouter.js";
import registetion from "./registetion/registetionRouter.js";
import middleware from "./middleware/middleware.js";
import renew from "./function/renew.js";
import express from "express";
import user from "./schema/userMdl.js";

const router = express.Router();

router.use("/api/login", loginRouter);
router.use("/api/registration", registetion);
router.get("/api/private", middleware.verify, async (req, res) => {
  const finduser = await user.findOne({ _id: req.user });

  res.status(200).json({ message: `hello ${finduser.email} login` });
});

router.post("/api/logout", middleware.verify, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ error: "error in logout" });
    }
  });
  res.clearCookie("connect.sid");
  res.status(200).send({ message: "logout" });
});
router.post("/api/refresh", renew.renewAccessToken);

export default router;
