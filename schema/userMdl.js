import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required."] },
    email: {
      type: String,
      required: [true, "Email ID is required."],
      unique: true,
    },
    password: { type: String, required: [true, "password is required."] },
    createdAt: { type: Date },
    refreshtoken: { type: String },
  },
  { versionKey: false }
);
const user = mongoose.model("users", userSchema);

export default user;
