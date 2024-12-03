import express from "express";
import mongoose from "mongoose";
import router from "./indexRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import envData from "./config.js";

const PORT = process.env.PORT;
console.log("envData.port", envData.port);
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  session({
    secret: "7TDvew2EzG",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser());
app.use("/", router);
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message || "Server Error" });
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
