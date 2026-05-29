import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/", auth(), issueController.createIssue);
router.get( "/", auth(),issueController.getAllIssues,);
router.get("/:id", auth(), issueController.getSingleIssue);
router.put("/:id", auth(),  issueController.updateIssue);
router.delete("/:id", auth(USER_ROLE.maintainer,),issueController.deleteIssue);

export const issueRoute = router;

//   auth(USER_ROLE.maintainer, USER_ROLE.contributor,),
