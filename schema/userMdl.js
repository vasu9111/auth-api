import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required (from db)."] },
    email: {
      type: String,
      required: [true, "Email ID is required."],
      unique: true,
    },
    password: { type: String, required: [true, "password is required."] },
    createdAt: { type: Date },
    refreshToken: { type: String },
  },
  { versionKey: false }
);
const userMdl = mongoose.model("users", userSchema);

export default userMdl;
