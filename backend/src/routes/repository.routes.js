import {
  addRepoToDb,
  getUserRepos,
  createNewRepo,
} from "../controllers/repository.controller.js";
import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/get-repos").get(getUserRepos);
router.route("/add-repo").post(addRepoToDb);
router.route("/create-repo").post(createNewRepo);

export default router;
