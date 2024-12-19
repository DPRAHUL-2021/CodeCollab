import axios from "axios";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Repository } from "../models/repository.model.js";

const getUserRepos = asyncHandler(async (req, res) => {
  const githubAccessToken =
    req.cookies.githubAccessToken || req.headers.authorization;
  const githubUser = req.user.githubUsername;

  if (!githubAccessToken) {
    throw new ApiError(401, "Unauthorized from github.");
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${githubUser}/repos`,
      {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
        params: {
          visibility: "all",
          per_page: 20,
          sort: "updated",
        },
      }
    );
    const repos = response.data;
    console.log(repos);
    return res
      .status(200)
      .json(
        new ApiResponse(200, { repos }, "Repo names generated successfully")
      );
  } catch (error) {
    console.log(error);
  }
});

const addRepoToDb = asyncHandler(async (req, res) => {
  const githubAccessToken =
    req.cookies.githubAccessToken || req.headers.authorization;
  const userId = req.user._id;

  if (!githubAccessToken) {
    throw new ApiError(401, "No authorization for github");
  }

  const { name, id, htmlUrl, cloneUrl, desc, priv, language } = req.body;

  if (!name || !id || !htmlUrl || !cloneUrl || !priv || !language) {
    throw new ApiError(401, "Invalid repo details.");
  }

  const repo = await Repository.create({
    repoId: id,
    owner: userId,
    repoName: name,
    cloneUrl: cloneUrl,
    htmlUrl: htmlUrl,
    desc: desc,
    private: priv,
    language: language,
  });

  if (!repo) {
    throw new ApiError(500, "Error while creating repo.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, repo, "Repo created successfully"));
});

//Not working yet
const createNewRepo = asyncHandler(async (req, res) => {
  const githubAccessToken =
    req.cookies.githubAccessToken || req.headers.authorization;
  const userId = req.user._id;
  const githubUsername = req.user.githubUsername;

  if (!githubAccessToken) {
    throw new ApiError(401, "Not authorized.");
  }

  const { name, desc, priv } = req.body;

  if (!name || !priv) {
    throw new ApiError(401, "All details not provided.");
  }

  try {
    const response = await axios.post(
      `https://api.github.com/user/repos`,
      {
        name: name,
        description: desc,
        private: false,
        homepage: "https://github.com",
        auto_init: false,
      },
      {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json(200, {}, "Repo created successfully.");
});

//Have to see if implementation is needed
const changeRepositoryAccess = asyncHandler(async (req, res) => {});

export { getUserRepos, addRepoToDb, createNewRepo };
