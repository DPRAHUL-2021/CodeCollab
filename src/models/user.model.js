import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bath: {
    type: String,
    required: true,
    unique: true,
  },
  pfp: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

export const User = mongoose.Model("User", userSchema);
