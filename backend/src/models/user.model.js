import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

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
    githubUsername: {
      type: String,
      required: true,
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

userSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        githubId: this.githubId,
        name: this.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    throw new Error("Failed to generate access token.");
  }
};

export const User = mongoose.model("User", userSchema);
