import { Router } from "express";
import {
  loginUser,
  githubCallBack,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").get(loginUser);
router.route("/callback").post(githubCallBack);
router.route("/register").post(registerUser);

export default router;
