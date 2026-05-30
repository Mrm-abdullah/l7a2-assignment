import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { CreateIssueInput } from "./issue.interface";

const createIssueIntoDB = async (payload: CreateIssueInput, reporter_id: number) => {
  const { title, description, type, } = payload;
// console.log(payload)
  const result = await pool.query(

     `INSERT INTO issues (title, description, type, status, reporter_id, created_at, updated_at)
     VALUES ($1, $2, $3, 'open', $4, NOW(), NOW())
     RETURNING *`,[title, description, type, reporter_id],

  );
  return result;

};

const getAllIssuesFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM issues
  `);

  const issues = result.rows;

  if (issues.length === 0) {
    return [];
  }

  const formattedIssues = await Promise.all(
    issues.map(async (issue) => {
      const userResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id=$1`,
        [issue.reporter_id]
      );

      const user = userResult.rows[0];

      return {
        ...issue,
        reporter: user,
      };
    })
  );

  return formattedIssues;
};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const issue = result.rows[0];
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id]
  );
  const user = userResult.rows[0];

   return {
    ...issue,
    reporter: user,
  };
};

const updateIssueFromDB = async (payload: CreateIssueInput, id: string, reporter_id: number) => {
  const { title, description, type, } = payload;
  console.log(reporter_id)
   const userQuery = await pool.query(
    `SELECT * FROM users WHERE id=$1`,
    [reporter_id]
  );
  const user = userQuery.rows[0]
  // console.log("sdsdsds", user)

    const issueQuery = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  );
  const issue = issueQuery.rows[0];
  if (!issue) {
    throw new Error("NOT_FOUND");
  }

  if (user.role !== "maintainer" && issue.reporter_id !== user.id) {
    throw new Error("FORBIDDEN");
  }

  if (user.role == "contributor" && issue.status !== "open") {
    throw new Error("FORBIDDEN");
  }

  const result = await pool.query(
    `
    UPDATE issues 
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type)

     WHERE id = $4
  RETURNING *
  `,
  [title, description, type, id]
);

  return result;
};

const deleteIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM issues WHERE id=$1  
      `,
    [id],
  );
  return result;
};  


export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};