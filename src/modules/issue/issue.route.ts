import { Router } from "express";
import { issueController } from "./issue.controller";

const router = Router();

router.post("/", issueController.createIssue);
router.get(
  "/",
//   auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  issueController.getAllIssues,
);
router.get("/:id", issueController.getSingleIssue);
router.put("/:id", issueController.updateIssue);
// router.delete("/:id", userController.deleteUser);

export const issueRoute = router;