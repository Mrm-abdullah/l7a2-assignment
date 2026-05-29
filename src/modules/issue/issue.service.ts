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

// const updateIssueFromDB = async (payload: IIssue, id: string) => {
//   const { name, password, age, is_active } = payload;

//   const result = await pool.query(
//     `
//     UPDATE issue 
//     SET 
//     name=COALESCE($1,name),
//     password=COALESCE($2,password),
//     age=COALESCE($3,age),
//     is_active=COALESCE($4,is_active) 

//     WHERE id=$5 RETURNING *
//     `,
//     [name, password, age, is_active, id],
//   );

//   return result;
// };

// const deleteIssueFromDB = async (id: string) => {
//   const result = await pool.query(
//     `
//     DELETE FROM issue WHERE id=$1  
//       `,
//     [id],
//   );
//   return result;
// };

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  // updateIssueFromDB,
  // deleteIssueFromDB,
};