import userMdl from "../../schema/userMdl.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";
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
      const error = new Error("User not found");
      error.code = "USER_NOT_FOUND";
      error.status = 404;
      throw error;
    }

    if (password !== findUser.password) {
      const error = new Error("Invalid password");
      error.code = "INVALID_PASSWORD";
      error.status = 401;
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
      const error = new Error("user already exist");
      error.code = "USER_EXIST";
      error.status = 409;
      throw error;
    }
    // Create new user
    const newUser = new userMdl({
      name,
      email,
      password,
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

    const result = {
      _id: userAdd._id,
      name: userAdd.name,
      email: userAdd.email,
      password: userAdd.password,
      registeredAt: userAdd.registeredAt,
    };

    return { result, accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    const error = new Error(err.message);
    error.code = err.code || "SERVER_ERROR";
    error.status = err.status || 500;
    throw error;
  }
};
export default {
  loginUser,
  logoutUser,
  registerUser,
};
