import jwt from "jsonwebtoken";
import config from "../config.js";

const { accessTokenKey } = config.jwt;
const verify = (req, res, next) => {
  let token;
  const authToken = req.headers["authorization"];
  if (authToken && authToken.startsWith("Bearer ")) {
    token = authToken.split(" ")[1];
  }

  if (!token) {
    const error = new Error("TOKEN_MISSING");
    throw error;
  }
  if (token !== req.session.accessToken) {
    const error = new Error("ACCESS_DENIED");
    throw error;
  }
  try {
    const decoded = jwt.verify(token, accessTokenKey);

    req.user = decoded;

    next();
  } catch (err) {
    const error = new Error(err.message);
    error.code = err.code || "SERVER_ERROR";
    error.status = err.status || 500;
    return next(error);
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
