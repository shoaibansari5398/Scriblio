import express from "express";
import { adminLogin,getDashboard,getAllBlogsAdmin,getAllCommentsAdmin,deleteCommenById,approvedCommentById } from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/dashboard",auth, getDashboard);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.get("/comments",auth, getAllCommentsAdmin);
adminRouter.post("/delete-comment",auth, deleteCommenById);
adminRouter.post("/approve-comment",auth, approvedCommentById);


export default adminRouter;
