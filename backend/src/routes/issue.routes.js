import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  changeIssueStatus,
  createIssue,
  getAllIssues,
} from "../controllers/issue.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/create-issue").post(createIssue);
router.route("/get-issues").post(getAllIssues);
router.route("/change-issue-status").post(changeIssueStatus);

export default router;
