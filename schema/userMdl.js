import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required (from db)."] },
    email: {
      type: String,
      required: [true, "Email is required (from DB)"],
      unique: true,
      match: [
        /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address (from DB)",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required (from db)."],
      minLength: [6, "Password should be 6 characters short"],
    },
    registeredAt: { type: Date },
    refreshToken: { type: String },
  },
  { versionKey: false }
);
const userMdl = mongoose.model("users", userSchema);

export default userMdl;
