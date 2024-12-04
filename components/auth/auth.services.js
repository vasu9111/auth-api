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
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    if (password !== findUser.password) {
      const error = new Error("Invalid password");
      error.status = 400;
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
      error.status = 400;
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
    throw error;
  }
};
export default {
  loginUser,
  logoutUser,
  registerUser,
};
