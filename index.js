import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import checkAuth from "./utils/checkAuth.js";
import { current, login, register } from "./controllers/UserController.js";
import {
  commentCreateValidator,
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations.js";
import {
  createPost,
  deletePost,
  getAllComments,
  getAllPosts,
  getAllTags,
  getPostById,
  updatePost,
} from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { createComment } from "./controllers/CommentController.js";

mongoose
  .connect(
    "mongodb+srv://ayvazyanandranik46:RijDzs4XSllu2008@cluster0.gqiflip.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB is ready");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
//
app.post("/auth/login", loginValidator, handleValidationErrors, login);
app.post("/auth/register", registerValidator, handleValidationErrors, register);
app.get("/auth/current", checkAuth, current);
//
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
//
app.get("/tags", getAllTags);
app.get("/posts/tags", getAllTags);
//
app.get("/comments", getAllComments);
app.post(
  "/posts/comments/:id",
  checkAuth,
  commentCreateValidator,
  createComment
);
//
app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post(
  "/posts",
  checkAuth,
  postCreateValidator,
  handleValidationErrors,
  createPost
);
app.delete("/posts/:id", checkAuth, deletePost);
app.patch("/posts/:id", checkAuth, handleValidationErrors, updatePost);
//
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
