import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

const verify = (req, res, next) => {
  // const token = req.session.accesstoken;
  let token;
  const authtoken = req.headers["authorization"];
  if (authtoken && authtoken.startsWith("Bearer ")) {
    token = authtoken.split(" ")[1];
  }

  if (!token && token !== req.session.accesstoken) {
    return res.status(400).json({ error: "access denied. please login" });
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);

    req.user = decoded._id;

    next();
  } catch (error) {
    return res.status(401).send("invelid token");
  }
};

export default {
  verify,
};
