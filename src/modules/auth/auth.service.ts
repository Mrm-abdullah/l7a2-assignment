import bcrypt from "bcryptjs";
import { pool } from "./../../db/index";

import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { IUser } from "./auth.interface";


const createUserIntoDB = async (payload: IUser) => {
  // console.log(payload)
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'user')) RETURNING *
    `,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // console.log("SECRET:", config.secret);
// console.log("REFRESH SECRET:", config.refresh_secret);
  // console.log(payload)
  // console.log(config.connection_string);
  const { email, password } = payload;
  // 1. Check if the user exists -> Done
  // 2. Compare the password -> Done
  //3. Generate Token -> Done

  // 1. Check if the user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  // console.log(userData)
  if (userData.rows.length === 0) {
    
    throw new Error("Invalid Credentials!");
  }

  // 2. Compare the password -> Done
  const user = userData.rows[0];
  // console.log(user )
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //3. Generate Token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtpayload, config.refresh_secret as string, {
    expiresIn: "10d",
  });

    return {
  token: accessToken,
  refreshToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  },
};
};

const generateFreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
     SELECT * FROM users WHERE email=$1   
        `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found!!");
  }

  if (!user?.is_active) {
    throw new Error("Forbidden!!");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
  generateFreshToken,
};