import express from "express";
import { addBlog, getAllBlogs, getBlogById, togglePublish, deleteBlogById, addComment, getBlogComments } from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);


export default blogRouter;
