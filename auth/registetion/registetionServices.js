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
const postuser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      const error = new Error("user already exist");
      error.status = 400;
      throw error;
    }
    // Create new user
    const newuser = new user({
      name,
      email,
      password,
      createdAt: new Date(),
    });

    const useradd = await newuser.save();

    const accesstoken = jwt.sign({ _id: useradd._id }, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshtoken = jwt.sign({ _id: useradd._id }, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    useradd.refreshtoken = refreshtoken;
    await useradd.save();
    req.session.accesstoken = accesstoken;
    req.session.refreshtoken = refreshtoken;
    const result = {
      _id: useradd._id,
      name: useradd.name,
      email: useradd.email,
      password: useradd.password,
      createdAt: useradd.createdAt,
    };

    return result;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  postuser,
};
