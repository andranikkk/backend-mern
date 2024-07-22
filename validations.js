import { body } from "express-validator";

export const loginValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 3 symbols").isLength({ min: 3 }),
];

export const registerValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 3 symbols").isLength({ min: 3 }),
  body("fullName", "Enter name").isLength({ min: 3 }),
  body("avatarUrl", "Wrong image link").optional().isURL(),
];

export const postCreateValidator = [
  body("title", "Enter post title").isLength({ min: 3 }).isString(),
  body("text", "Enter post text").isLength({ min: 3 }).isString(),
  body("tags", "Wrong tag format (enter an array)").optional().isArray(),
  body("imageUrl", "Wrong image link").optional().isString(),
];

export const commentCreateValidator = [
  body("text", "Enter comment text").isLength({ min: 1 }).isArray(),
];
