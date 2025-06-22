import imagekit from "../configs/imageKit.js";
import fs from "fs";
import Blog from "../models/blog.js";

const addBlog = async (req, res) => {
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

export default addBlog;
