import user from "../schema/userMdl.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = "test";
const REFRESH_TOKEN_KEY = "test";
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by username
    const finduser = await user.findOne({ email });

    if (!finduser) {
      return { message: "Invalid credentials" };
    }

    if (password !== finduser.password) {
      return { message: "Invalid password" };
    }
    const accesstoken = jwt.sign({ _id: finduser._id }, ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });

    const refreshtoken = jwt.sign({ _id: finduser._id }, REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });
    finduser.refreshtoken = refreshtoken;
    await finduser.save();
    req.session.accesstoken = accesstoken;
    req.session.refreshtoken = refreshtoken;

    return {
      message: "Login successful",
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
    };
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  loginuser,
};
