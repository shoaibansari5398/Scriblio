import React, { useState, useRef, useEffect } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const AddBlog = () => {
	const { axios } = useAppContext();

	const [isAdding, setIsAdding] = useState(false);

	const [image, setImage] = useState(false);
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("Startup");
	const [subTitle, setSubTitle] = useState("");
	const [isPublished, setIsPublished] = useState(false);

	const editorRef = useRef(null);
	const quillRef = useRef(null);

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			setIsAdding(true);

			const blog = {
				title,
				subTitle,
				description: quillRef.current.root.innerHTML,
				category,
				isPublished,
			};

			const formData = new FormData();
			formData.append("blog", JSON.stringify(blog));
			formData.append("image", image);

			const { data } = await axios.post("/api/blog/add", formData);
			if(data.success){
				toast.success(data.message);
				setTitle("");
				setSubTitle("");
				setCategory("Startup");
				setImage(false);
				quillRef.current.root.innerHTML = "";
			}
			else{
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			setIsAdding(false);
		}
	};

	const generateContent = () => {
		console.log("generateContent");
	};

	useEffect(() => {
		if (!quillRef.current && editorRef.current) {
			quillRef.current = new Quill(editorRef.current, {
				theme: "snow",
			});
		}
	});

	return (
		<form
			action=""
			onSubmit={onSubmitHandler}
			className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
		>
			<div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 rounded shadow">
				<p>Upload Thumbnail</p>
				<label htmlFor="image">
					<img
						src={!image ? assets.upload_area : URL.createObjectURL(image)}
						alt=""
						className="mt-2 h-16 rounded cursor-pointer"
					/>
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type="file"
						id="image"
						hidden
						required
					/>
				</label>

				<p className="mt-4">Blog Title</p>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					name="title"
					id="title"
					required
					placeholder="Enter your title"
					className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
				/>
				<p className="mt-4">Blog Subtitle</p>
				<input
					value={subTitle}
					onChange={(e) => setSubTitle(e.target.value)}
					type="text"
					name="subtitle"
					id="subtitle"
					required
					placeholder="Enter your subtitle"
					className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
				/>
				<p className="mt-4">Blog Description</p>
				<div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
					<div ref={editorRef} />
					<button
						type="button"
						onClick={generateContent}
						className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
					>
						Generatw with AI
					</button>
				</div>
				<p className="mt-4">Blog Category</p>
				<select
					onChange={(e) => setCategory(e.target.value)}
					value={category}
					name="category"
					className="mt-2 px-3 pt-2 border text-gray-600 border-gray-300 outline-none rounded"
				>
					<option value="">Select Category</option>
					{blogCategories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
				<div className="flex gap-2 mt-4">
					<p>Publish Now</p>
					<input
						className="scale-125 cursor-pointer"
						type="checkbox"
						checked={isPublished}
						onChange={(e) => setIsPublished(e.target.checked)}
					/>
				</div>
				<button
					disabled={isAdding}
					type="submit"
					className="mt-8 w-40 h-10 bg-primary text-white rounded hover:scale-105 transition-all cursor-pointer"
				>
					{isAdding ? "Adding..." : "Add Blog"}
				</button>
			</div>
		</form>
	);
};

export default AddBlog;
