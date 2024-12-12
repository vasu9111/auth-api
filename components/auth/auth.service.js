import userMdl from "../../schema/userMdl.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

import bcrypt from "bcrypt";
const saltRounds = 10;
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
const decryptPassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};
const {
  accessTokenKey,
  refreshTokenKey,
  accessTokenExpiry,
  refreshTokenExpiry,
} = config.jwt;

//login Services

const loginUser = async (reqBody) => {
  const { email, password } = reqBody;
  try {
    // Find user by username
    const findUser = await userMdl.findOne({ email });

    if (!findUser) {
      const error = new Error("USER_NOT_FOUND");
      throw error;
    }

    if (!decryptPassword(password, findUser.password)) {
      const error = new Error("INVALID_PASSWORD");
      throw error;
    }
    const accessToken = jwt.sign({ _id: findUser._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign({ _id: findUser._id }, refreshTokenKey, {
      expiresIn: refreshTokenExpiry,
    });
    findUser.refreshToken = refreshToken;
    await findUser.save();

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    error.code = err.code || "SERVER_ERROR";
    error.status = err.status || 500;
    throw error;
  }
};

const logoutUser = async (req, res) => {
  const user = await userMdl.findOne({ _id: req.user._id });
  if (!user) {
    const error = new Error("USER_NOT_FOUND");
    throw error;
  }
  user.refreshToken = null;
  await user.save();
  req.session.destroy((err) => {
    if (err) {
      const error = new Error("Somting went wrong during logout");
      error.code = "ERR_LOGOUT";
      error.status = 400;
      throw error;
    }
  });
  res.clearCookie("connect.sid");
  res.status(200).send({ message: "Logged out successfully" });
};
//  registration Services

const emailExistingCheck = async (email) => {
  const countEmailExisting = await userMdl.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// Add user
const registerUser = async (reqBody) => {
  const { name, email, password } = reqBody;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      const error = new Error("USER_EXIST");
      throw error;
    }
    // const hashedPassword = await bcrypt.hash(password, 5);
    const hashPassword = encryptPassword(password);
    // Create new user
    const newUser = new userMdl({
      name,
      email,
      password: hashPassword,
      registeredAt: new Date(),
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

    const newUserDetail = {
      name: userAdd.name,
      email: userAdd.email,
      registeredAt: userAdd.registeredAt,
    };

    return {
      newUserDetail,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    if (err.name === "ValidationError") {
      err.code = "DB_ERROR";
      err.status = 400;
    }
    error.code = err.code || "SERVER_ERROR";
    error.status = err.status || 500;
    throw error;
  }
};
export default {
  loginUser,
  logoutUser,
  registerUser,
  encryptPassword,
  decryptPassword,
};
