import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";


const createIssue = async (req: Request, res: Response) => {

  try {
    const result = await issueService.createIssueIntoDB(req.body, req.user?.id);
    // console.log(result);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getAllIssuesFromDB();

    return res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: issues,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const issue = await issueService.getSingleIssueFromDB(id as string);
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue Not found!",
        
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: issue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reporter_id = req.user?.id
  // console.log("Id : ", id);

  try {
    const result = await issueService.updateIssueFromDB(req.body, id as string, reporter_id);
// console.log(result)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Issue Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Issue updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.user?.role !== "maintainer") {
      return res.status(403).json({
        success: false,
        message: "Only maintainer can delete issues",
      });
    }
    
    const result = await issueService.deleteIssueFromDB(id as string);

    // console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Issue Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};