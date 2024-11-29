import user from "../../schema/userMdl.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by username
    const findUser = await user.findOne({ email });

    if (!findUser) {
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    if (password !== findUser.password) {
      const error = new Error("Invalid password");
      error.status = 400;
      throw error;
    }
    const accessToken = jwt.sign({ _id: findUser._id }, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ _id: findUser._id }, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    findUser.refreshToken = refreshToken;
    await findUser.save();
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    return {
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const logoutUser = async (req, res) => {
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
  loginUser,
  logoutUser,
};
