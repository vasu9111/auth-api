import user from "../schema/userMdl.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const { accessTokenKey, refreshTokenKey, accessTokenExpiry } = config.jwt;

const renewAccessToken = async (req, res, next) => {
  // const incomingRefreshToken = req.session.refreshtoken;

  let incomingRefreshToken;
  const authtoken = req.headers["authorization"];
  if (authtoken && authtoken.startsWith("Bearer ")) {
    incomingRefreshToken = authtoken.split(" ")[1];
  }
  if (!incomingRefreshToken) {
    const error = new Error("REFRESH_TOKEN_MISSING");
    return next(error);
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, refreshTokenKey);

    const foundUser = await user.findOne({ _id: decoded._id });

    if (!foundUser) {
      const error = new Error("INVALID_REFRESH_TOKEN");
      return next(error);
    }

    if (incomingRefreshToken !== foundUser.refreshToken) {
      const error = new Error("REFRESH_TOKEN_EXPIRED");
      return next(error);
    }

    const accessToken = jwt.sign({ _id: foundUser._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });

    req.session.accessToken = accessToken;
    return res.status(200).json({
      message: "Access token renewed successfully.",
      accessToken: accessToken,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error("REFRESH_TOKEN_EXPIRED");
      return next(error);
    }

    if (err.name === "JsonWebTokenError") {
      const error = new Error("TOKEN_INVALID");
      return next(error);
    }
    const error = new Error(err.message);
    error.code = err.code || "SERVER_ERROR";
    error.status = err.status || 500;
    return next(error);
  }
};

export default {
  renewAccessToken,
};
