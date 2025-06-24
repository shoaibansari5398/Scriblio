import { useEffect, useState } from "react";

import React from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ListBlog = () => {
	const [blogs, setBlogs] = useState([]);

	const { axios } = useAppContext();

	const fetchBlogs = async () => {
		try {
			const { data } = await axios.get("/api/admin/blogs");
			if(data.success){
				setBlogs(data.blogs);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
			<h1 className="text-xl font-semibold">All Blogs</h1>

			<div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4">
				<table className="w-full text-sm text-gray-500">
					<thead className="text-gray-700 text-xs text-left uppercase">
						<tr>
							<th scope="col" className="px-2 py-4 xl:px-6">
								#
							</th>
							<th scope="col" className="px-2 py-4">
								Blog Title
							</th>
							<th scope="col" className="px-2 py-4 max-sm:hidden">
								Date
							</th>
							<th scope="col" className="px-2 py-4 max-sm:hidden">
								Status
							</th>
							<th scope="col" className="px-2 py-4">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{blogs.map((blog, index) => (
							<BlogTableItem
								key={blog._id}
								blog={blog}
								fetchBlogs={blogs}
								index={index}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListBlog;
