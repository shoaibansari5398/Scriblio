import imagekit from "../configs/imageKit.js";
import fs from "fs";
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
	try {
		const { title, subTitle, description, category, isPublished } = JSON.parse(
			req.body.blog
		);
		const imageFile = req.file;

		if (!title || !subTitle || !category || !imageFile) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Upload Image to ImageKit

		const fileBuffer = fs.readFileSync(imageFile.path);

		const response = await imagekit.upload({
			file: fileBuffer,
			fileName: imageFile.originalname,
			folder: "/blogs",
		});

		// optimization throought imagekit transformation
		const optimizedImageUrl = imagekit.url({
			path: response.filePath,
			transformation: [
				{
					width: "1280",
					quality: "auto",
					format: "webp",
				},
			],
		});

		const image = optimizedImageUrl;

		await Blog.create({
			title,
			subTitle,
			description,
			category,
			isPublished,
			image,
		});

		res.status(201).json({ message: "Blog added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({ isPublished: true });
		res.json({ success: true, blogs });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getBlogById = async (req, res) => {
	try {
		const { blogId } = req.params;
		const blog = await Blog.findById(blogId);
		if (!blog) {
			return res
				.status(404)
				.json({ success: false, message: "Blog not found" });
		}
		res.json({ success: true, blog });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const deleteBlogById = async (req, res) => {
	try {
		const { id } = req.body;
		await Blog.findByIdAndDelete(id);

		// Delete comments associated with the blog
		await Comment.deleteMany({ blog: id });

		res.json({ success: true, message: "Blog deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const togglePublish = async (req, res) => {
	try {
		const { id } = req.body;
		const blog = await Blog.findById(id);
		if (!blog) {
			return res
				.status(404)
				.json({ success: false, message: "Blog not found" });
		}
		blog.isPublished = !blog.isPublished;
		await blog.save();
		res.json({ success: true, message: "Blog status updated" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const addComment = async (req, res) => {
	try {
		const { blogId, name, content } = req.body;
		await Comment.create({ blog: blogId, name, content, isApproved: false });
		res.json({ success: true, message: "Comment added for review" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export const getBlogComments = async (req, res) => {
	try {
		const { blogId } = req.body;
		const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({
			createdAt: -1,
		});

		res.json({ success: true, comments });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
