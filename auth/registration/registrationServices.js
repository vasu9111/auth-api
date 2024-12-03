import userMdl from "../../schema/userMdl.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";
const {
  accessTokenKey,
  refreshTokenKey,
  accessTokenExpiry,
  refreshTokenExpiry,
} = config.jwt;
// const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
// const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
// const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
// const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const emailExistingCheck = async (email) => {
  const countEmailExisting = await userMdl.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// Add user
const userRegister = async (reqBody) => {
  const { name, email, password } = reqBody;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      const error = new Error("user already exist");
      error.status = 400;
      throw error;
    }
    // Create new user
    const newUser = new userMdl({
      name,
      email,
      password,
      createdAt: new Date(),
    });

    const userAdd = await newUser.save();

    const accessToken = jwt.sign({ _id: userAdd._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign({ _id: userAdd._id }, refreshTokenKey, {
      expiresIn: refreshTokenExpiry,
    });

    userAdd.refreshToken = refreshToken;
    await userAdd.save();

    const result = {
      _id: userAdd._id,
      name: userAdd.name,
      email: userAdd.email,
      password: userAdd.password,
      createdAt: userAdd.createdAt,
    };

    return result;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  userRegister,
};
