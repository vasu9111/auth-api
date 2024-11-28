import user from "../../schema/userMdl.js";
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
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    if (password !== finduser.password) {
      const error = new Error("Invalid password");
      error.status = 400;
      throw error;
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
    const error = new Error(err.message);
    throw error;
  }
};
const logoutuser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      const error = new Error("error in logout");
      error.status = 400;
      throw error;
    }
  });
  res.clearCookie("connect.sid");
  res.status(200).send({ message: "logout" });
};
export default {
  loginuser,
  logoutuser,
};
