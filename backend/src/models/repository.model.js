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
  },
  url: {
    type: String,
    required: true,
  },
});
