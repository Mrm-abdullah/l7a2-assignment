import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";


const createIssue = async (req: Request, res: Response) => {

  try {
    const result = await issueService.createIssueIntoDB(req.body);
    // console.log(result);

    sendResponse(res, {
      statusCode: 201,
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
  // console.log("COntroller", req);
  try {
    const result = await issueService.getAllIssuesFromDB();
    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Issue Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
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

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  // console.log("Id : ", id);

  try {
    const result = await issueService.updateIssueFromDB(req.body, id as string);

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

// const deleteIssue = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const result = await issueService.deleteIssueFromDB(id as string);

//     console.log(result);
//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "Issue Not found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Issue deleted successfully!",
//       data: {},
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error: error,
//     });
//   }
// };

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
//   deleteIssue,
};