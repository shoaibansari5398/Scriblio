import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
	const { blog, _id, createdAt } = comment;

	const BlogDate = new Date(createdAt);

	const {axios}=useAppContext();

	const approveComment = async () => {
		try {
			const {data}=await axios.post('/api/admin/approve-comment',{id:_id});
			if(data.success){
				toast.success(data.message);
				await fetchComments();
			}
		} catch (error) {
			console.log(error);
		}
	}

	const deleteComment = async () => {
		try {
			const confirm=window.confirm("Are you sure you want to delete this comment?");
			if(!confirm){
				return;
			}
			const {data}=await axios.post('/api/admin/delete-comment',{id:_id});
			if(data.success){
				toast.success(data.message);
				await fetchComments();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<tr className="order-y border-y border-gray-300">
			<td className="px-6 py-4">
				<b className="font-medium text-gray-600">Blog</b> : {blog.title}
				<br />
				<br />
				<b className="font-medium text-gray-600">Name</b> : {comment.name}
				<br />
				<b className="font-medium text-gray-600">Comment</b> : {comment.content}
			</td>
			<td className="px-6 py-4 max-sm:hidden">
				{BlogDate.toLocaleDateString()}
			</td>
			<td className="px-6 py-4">
				<div className="inline-flex items-center gap-4">
					{
						!comment.isApproved ? <img src={assets.tick_icon} alt="" className="w-5 hover:scale-105 transition-all cursor-pointer" onClick={approveComment}/>
						: <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
					}
					<img src={assets.bin_icon} alt="" className="w-5 hover:scale-105 transition-all cursor-pointer" onClick={deleteComment}/>
				</div>
			</td>
		</tr>
	);
};

export default CommentTableItem;
