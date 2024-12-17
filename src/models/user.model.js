import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    contactInfo: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    batch: {
      type: String,
      unique: true,
    },
    pfp: {
      type: String,
      default: "",
    },
    repoUrl: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
