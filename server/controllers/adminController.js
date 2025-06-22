import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = (req, res) => {
	try {
		const { email, password } = req.body;
		if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ message: "Admin logged in successfully", token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getAllBlogsAdmin = async (req, res) => {
	try {
		const blogs = await Blog.find({}).sort({ createdAt: -1 });
		res.json({ success: true, blogs });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getAllCommentsAdmin = async (req, res) => {
	try {
		const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
		res.json({ success: true, comments });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getDashboard= async (req, res) => {
	try {
		const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
		const blogs = await Blog.countDocuments();
		const comments = await Comment.countDocuments();

		const dashboardData = {
			recentBlogs,
			blogs,
			comments,
		}

		res.json({ success: true, dashboardData });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}


export const deleteCommenById= async (req, res) => {
	try {
		const {id} = req.body;
		const comment = await Comment.findByIdAndDelete(id);
		if(!comment){
			return res.status(404).json({success: false, message: "Comment not found"})
		}
		res.json({success: true, message: "Comment deleted successfully"})
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}

export const approvedCommentById= async (req, res) => {
	try {
		const {id} = req.body;
		await Comment.findByIdAndUpdate(id, {isApproved: true});
		res.json({success: true, message: "Comment approved successfully"})
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}
