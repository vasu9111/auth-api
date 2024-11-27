import user from "../schema/userMdl.js";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = "test";
const REFRESH_TOKEN_KEY = "test";

// Add user
const postuser = async (req, res) => {
  const { name, email, password } = req.body;

  // Create new user
  const newuser = new user({
    name,
    email,
    password,
    createdAt: new Date(),
  });

  const useradd = await newuser.save();

  const accesstoken = jwt.sign({ _id: useradd._id }, ACCESS_TOKEN_KEY, {
    expiresIn: "15m",
  });

  const refreshtoken = jwt.sign({ _id: useradd._id }, REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
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
};

export default {
  postuser,
};
