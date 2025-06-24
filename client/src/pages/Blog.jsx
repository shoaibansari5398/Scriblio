import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Blog = () => {
	const { id } = useParams();
	const {axios} = useAppContext();

	const [data, setData] = useState(null);
	const [comments, setComments] = useState([]);
	const [name, setName] = useState("");
	const [content, setContent] = useState("");

	const fetchBlogData = async () => {
		try {
			const { data } = await axios.get(`/api/blog/${id}`);
			data.success ? setData(data.blog) : toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const fetchComments = async () => {
		try {
			const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
			data.success ? setComments(data.comments) : toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const addComment = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`/api/blog/add-comment`, { blogId: id, name, content });
			if (data.success) {
				toast.success(data.message);
				setName("");
				setContent("");
				// fetchComments();
			}
			else{
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchBlogData();
		fetchComments();
	}, [id]);

	return data ? (
		<div className="relative">
			<img
				src={assets.gradientBackground}
				className="absolute -top-50 -z-1 opacity-50"
			/>
			<Navbar />
			<div className="text-center mt-20 text-gray-600">
				<p className="text-primary font-medium py-4">
					Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
				</p>
				<h1 className="text-2xl sm:text-5xl font-semibold max-w-xl mx-auto text-gray-800">
					{data.title}
				</h1>
				<h2 className="my-5 max-w-lg mx-auto truncate">{data.subTitle}</h2>
				<p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 text-primary font-medium">
					Shoaib Ansari
				</p>
			</div>
			<div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
				<img src={data.image} alt="" className="rounded-3xl b-5" />
				<div
					dangerouslySetInnerHTML={{ __html: data.description }}
					className="rich-text max-w-3xl mx-auto"
				></div>

				{/* Comments Section */}

				<div className="mt-14 mb-10 max-w-3xl mx-auto">
					<p className="font-semibold mb-4">Comments ({comments.length})</p>
					<div className="flex flex-col gap-4">
						{comments.map((comment, index) => (
							<div
								key={index}
								className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 text-gray-600 rounded"
							>
								<div className="flex items-center gap-2 mb-2">
									<img className="w-6" src={assets.user_icon} alt="" />
									<p className="font-medium">{comment.name}</p>
								</div>
								<p className="text-sm max-w-md ml-8">{comment.content}</p>
								<div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
									{Moment(comment.createdAt).fromNow()}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Add Comment Section */}

				<div className="max-w-3xl mx-auto">
					<p className="font-semibold mb-4">Add your comment</p>
					<form
						onSubmit={addComment}
						className="flex flex-col gap-4 items-start max-w-lg"
						action=""
					>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							placeholder="Name"
							className="w-full p-2 border border-gray-300 rounded outline-none"
						/>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Comment"
							className="w-full p-2 border border-gray-300 rounded outline-none h-48"
						></textarea>
						<button
							type="submit"
							className="bg-primary text-white px-8 p-2 rounded hover:scale-102 transition-all cursor-pointer"
						>
							Post Comment
						</button>
					</form>
				</div>

				{/* Socials */}

				<div className="my-24 max-w-3xl mx-auto">
					<p className="font-semibold mb-4">Share this article on Social Media</p>
					<div className="flex">
						<img src={assets.facebook_icon} width={50} alt="" />
						<img src={assets.twitter_icon} width={50} alt="" />
						<img src={assets.googleplus_icon} width={50} alt="" />
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	) : (
		<Loader/>
	);
};

export default Blog;
