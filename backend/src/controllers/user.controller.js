import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import axios from "axios";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const options = {
  httpOnly: true,
  secure: false,
  sameSite: "none",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (err) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
});

const githubCallBack = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    throw new ApiError(400, "Authentication invalid.");
  }

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const githubAccessToken = tokenResponse.data.access_token;

    if (!githubAccessToken) {
      throw new ApiError(400, "No access token generated.");
    }

    const userData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });

    const githubId = userData.data.id;

    const user = await User.findOne({ githubId: githubId });

    if (user) {
      if (user.githubUsername !== userData.data.login) {
        const updatedName = await User.findOneAndUpdate(
          { githubId: githubId },
          {
            githubUsername: userData.data.login,
          },
          { new: true }
        );
        if (!updatedName) {
          throw new ApiError(500, "Unable to update your name.");
        }
      }

      const { accessToken } = await generateAccessToken(user._id);
      res.cookie("githubAccessToken", githubAccessToken, options);
      res.cookie("accessToken", accessToken, options);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { accessToken, githubId },
            "Access token generated"
          )
        );
    }

    const registerUser = await User.create({
      githubId: githubId,
      repoUrl: userData.data.repos_url,
      githubUrl: userData.data.html_url,
      name: userData.data.name,
      githubUsername: userData.data.login,
    });

    res.cookie("githubAccessToken", githubAccessToken, options);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { githubAccessToken, githubId },
          "Access token generated"
        )
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Failed fetching data.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { rollNumber, batch, contactInfo, githubId, email } = req.body;

  if (!rollNumber || !batch || !githubId || !email) {
    throw new ApiError(400, "Not all details are given.");
  }

  const user = await User.findOneAndUpdate(
    { githubId: githubId },
    {
      rollNumber: rollNumber,
      batch: batch,
      contactInfo: contactInfo,
      email: email,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  const { accessToken } = await generateAccessToken(user._id);

  res.cookie("accessToken", accessToken, options);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details registered."));
});

export { loginUser, githubCallBack, registerUser };
