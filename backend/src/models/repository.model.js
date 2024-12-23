import mongoose, { Schema } from "mongoose";

const repositorySchema = new Schema({
  repoId: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  repoName: {
    type: String,
    required: true,
    unique: true,
  },
  cloneUrl: {
    type: String,
    required: true,
  },
  htmlUrl: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  private: {
    type: Boolean,
  },
  language: {
    type: String,
  },
});

export const Repository = mongoose.model("Repository", repositorySchema);
