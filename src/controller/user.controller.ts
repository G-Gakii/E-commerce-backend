import { Request, Response } from "express";
import {
  addUserQuery,
  deleteUserQUery,
  EditUserdDataQuery,
  existingUserQuery,
  getALLUsers,
  getOneUser,
} from "../queries/queries";
import pool from "../db";
import * as argon2 from "argon2";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (!username && !password && !role) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    let existingUser = await pool.query(existingUserQuery, [username]);
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      res.status(409).json({ message: "username already exist" });
      return;
    }
    const hashedPassword = await argon2.hash(password);
    const user = await pool.query(addUserQuery, [
      username,
      hashedPassword,
      role,
    ]);
    if (user) {
      res.status(201).json({ message: "user created successfully" });
    }
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "internal server error" + " " + err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query(getALLUsers);
    if (users.rowCount === 0) {
      res.status(200).json({ message: "No users available" });
      return;
    }
    res.status(200).json(users.rows);
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json("Internal server error" + " " + err.message);
    return;
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await pool.query(getOneUser, [id]);
    if (user.rowCount === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user.rows);
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json("Internal server error" + " " + err.message);
    return;
  }
};

export const EditUserdData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const existingUser = await pool.query(getOneUser, [id]);
    if (existingUser.rowCount === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const hashedPassword = await argon2.hash(password);
    const editedUser = await pool.query(EditUserdDataQuery, [
      username,
      hashedPassword,
      role,
      id,
    ]);
    res.status(200).json({ message: "user created successfully" });
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json("Internal server error" + " " + err.message);
    return;
  }
};

export const RemoveUSER = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await pool.query(deleteUserQUery, [id]);
    if (user.rowCount === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json({ message: "user deleted successfully" });
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json("Internal server error" + " " + err.message);
    return;
  }
};
