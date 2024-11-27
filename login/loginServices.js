import user from "../schema/userMdl.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

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
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshtoken = jwt.sign({ _id: finduser._id }, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
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
    return { error: err.message };
  }
};

export default {
  loginuser,
};
