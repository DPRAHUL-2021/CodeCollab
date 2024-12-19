import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Issue } from "../models/issue.model.js";

const getAllIssues = asyncHandler(async (req, res) => {
  const { repoId } = req.body;

  if (!repoId) {
    throw new ApiError(401, "Details to fetch issue not provided.");
  }

  const issues = await Issue.find({ repoId: repoId });

  if (!issues) {
    return res.status(201).json(new ApiResponse(201, {}, "No issues found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, issues, "Issues fetched successfully."));
});

const createIssue = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { repoId, desc, heading, skills } = req.body;

  if (!repoId || !desc || !heading || !skills) {
    throw new ApiError(401, "Details to create issue not specified.");
  }

  const issue = await Issue.create({
    userId: userId,
    repoId: repoId,
    description: desc,
    heading: heading,
    skills: skills,
  });

  if (!issue) {
    throw new ApiError(500, "Creating issue failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Issue created successfully."));
});

export { getAllIssues, createIssue };
