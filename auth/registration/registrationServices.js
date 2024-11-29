import user from "../../schema/userMdl.js";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const emailExistingCheck = async (email) => {
  const countEmailExisting = await user.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// Add user
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      const error = new Error("user already exist");
      error.status = 400;
      throw error;
    }
    // Create new user
    const newUser = new user({
      name,
      email,
      password,
      createdAt: new Date(),
    });

    const userAdd = await newUser.save();

    const accessToken = jwt.sign({ _id: userAdd._id }, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ _id: userAdd._id }, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    userAdd.refreshToken = refreshToken;
    await userAdd.save();
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
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
