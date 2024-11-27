import express from "express";
import mongoose from "mongoose";
import router from "./indexRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT;
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
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser());
app.use("/", router);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
