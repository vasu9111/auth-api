import express from "express";
import mongoose from "mongoose";
import router from "./indexRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import envData from "./config.js";
import cors from "cors";
const PORT = envData.port;
console.log("envData.port", envData.port);
const MY_DB_URL = envData.dbUrl;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
mongoose
  .connect(MY_DB_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  session({
    secret: envData.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser());
app.use("/", router);
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    code: err.code || "error unknown",
    message: err.message || "Server Error",
  });
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
