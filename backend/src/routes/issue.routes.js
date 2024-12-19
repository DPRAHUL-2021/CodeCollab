import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { createIssue, getAllIssues } from "../controllers/issue.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/create-issue").post(createIssue);
router.route("/get-issues").get(getAllIssues);

export default router;
