import mongoose, { Schema } from "mongoose";

const issueSchema = new Schema({
  repoId: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length <= 5;
      },
      message: "Only 5 skills allowed.",
    },
    required: true,
  },
  issueImage: {
    type: String,
  },
});

export const Issue = mongoose.model("Issue", issueSchema);
