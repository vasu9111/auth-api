import user from "../schema/userMdl.js";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

const renewAccessToken = async (req, res, next) => {
  // const incomingRefreshToken = req.session.refreshtoken;

  let incomingRefreshToken;
  const authtoken = req.headers["authorization"];
  if (authtoken && authtoken.startsWith("Bearer ")) {
    incomingRefreshToken = authtoken.split(" ")[1];
  }
  if (!incomingRefreshToken) {
    const error = new Error("Unauthorized request. Refresh token missing.");
    error.status = 401;
    return next(error);
  }
  console.log(incomingRefreshToken);

  try {
    const decoded = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_KEY);
    console.log(decoded);

    const foundUser = await user.findOne({ _id: decoded._id });

    if (!foundUser) {
      const error = new Error("INVALID REFRESH TOKEN");
      error.status = 404;
      return next(error);
    }
    console.log(foundUser);

    if (incomingRefreshToken !== foundUser.refreshtoken) {
      const error = new Error("Refresh token is not same");
      error.status = 404;
      return next(error);
    }

    const accessToken = jwt.sign({ _id: foundUser._id }, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    console.log(accessToken);

    req.session.accessToken = accessToken;
    return res.status(200).json({
      message: "Access token renewed successfully.",
      accessToken: accessToken,
    });
  } catch (err) {
    const error = new Error("Refresh token is expired or not accessible");
    error.status = 500;
    return next(error);
  }
};

export default {
  renewAccessToken,
};
