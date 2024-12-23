import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Issue } from "../models/issue.model.js";
import { Repository } from "../models/repository.model.js";

const getAllIssues = asyncHandler(async (req, res) => {
  const { repoId } = req.body;

  if (!repoId) {
    throw new ApiError(401, "Details to fetch issue not provided.");
  }

  const issues = await Issue.find({ repoId: repoId }).populate({
    path: "repoId",
    select: "repoName htmlUrl",
  });

  if (issues.length <= 0) {
    const repoData = await Repository.findById(repoId).select("repoName");
    return res
      .status(201)
      .json(new ApiResponse(201, repoData, "No issues found"));
  }

  console.log(issues);

  return res
    .status(200)
    .json(new ApiResponse(200, issues, "Issues fetched successfully."));
});

const changeIssueStatus = asyncHandler(async (req, res) => {
  const { issueId } = req.body;

  if (!issueId) {
    throw new ApiError(403, "No issue id provided");
  }

  const updatedIssue = await Issue.findByIdAndUpdate(
    issueId,
    { status: "close" },
    { new: true } // Return the updated document
  );

  if (!updatedIssue) {
    throw new ApiError(500, "Failed to update issue.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedIssue, "Issue status updated successfully")
    );
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
    status: "open",
  });

  if (!issue) {
    throw new ApiError(500, "Creating issue failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Issue created successfully."));
});

export { getAllIssues, createIssue, changeIssueStatus };
