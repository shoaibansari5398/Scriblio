import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/admin/CommentTableItem";

const Comments = () => {
	const [comments, setComments] = useState([]);
	const [filter, setFilter] = useState("Not Approved");

	const fetchComments = async () => {
		setComments(comments_data);
	};

	useEffect(() => {
		fetchComments();
	}, []);

	return (
		<div>
			<div>
				<h1>Comments</h1>
				<div>
					<button onClick={() => setFilter("Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 text-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}>Approved</button>
					<button onClick={() => setFilter("Not Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 text-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}>Not Approved</button>
				</div>
			</div>
			<div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
				<table className="w-full text-sm text-gray-500">
					<thead className="text-gray-700 text-xs text-left uppercase">
						<tr>
							<th scope="col" className="px-6 py-3">Blog Title & Comment</th>
							<th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
							<th scope="col" className="px-6 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{comments.filter((comment) => filter === "Approved" ? comment.isApproved : !comment.isApproved).map((comment, index) => (
							<CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} index={index+1} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Comments;
