import express from "express";
import mongoose from "mongoose";
import router from "./indexRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
const DB_URL = "mongodb://localhost:27017/jwt";
const app = express();

app.use(express.json());

mongoose.connect(DB_URL).then(() => console.log("database Connected"));
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

app.listen(4000, () => console.log("server runing 4000"));
