import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { CreateIssueInput } from "./issue.interface";

const createIssueIntoDB = async (payload: CreateIssueInput) => {
  const { title, description, type, reporter_id } = payload;
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
  return result;
};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM Issues WHERE id=$1  
        `,
    [id],
  );
  return result;
};

const updateIssueFromDB = async (payload: CreateIssueInput, id: string) => {
  const { title, description, type, reporter_id } = payload;

  const result = await pool.query(
    `
    UPDATE issues 
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type),
    reporter_id=COALESCE($4,reporter_id) 

    WHERE id=$5 RETURNING *
    `,
    [title, description, type, reporter_id, id],
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