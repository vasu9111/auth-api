import jwt from "jsonwebtoken";
// import user from "../schema/userMdl";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

const verify = (req, res, next) => {
  // const token = req.session.accesstoken;
  let token;
  const authToken = req.headers["authorization"];
  if (authToken && authToken.startsWith("Bearer ")) {
    token = authToken.split(" ")[1];
  }

  if (!token && token !== req.session.accesstoken) {
    const error = new Error("access denied. please login");
    error.status = 400;
    throw error;
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);

    req.user = decoded._id;

    next();
  } catch (err) {
    const error = new Error("invalid token");
    error.status = 400;
    throw error;
  }
};

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errorMessage = [];
      for (let detail of error.details) {
        errorMessage.push(detail.message);
      }
      res.status(400).json({ error: errorMessage });
    }
  };
};

export default {
  verify,
  validate,
};
