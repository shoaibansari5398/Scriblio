
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { blog_data } from "../assets/assets";

const Blog = () => {

	const {id} = useParams();

	const [data, setData] = useState(null);

	const fetchBlogData = async () => {
		const data = blog_data.find((blog) => blog._id === id);
		setData(data);
	 }


	useEffect(() => {
		fetchBlogData();
	},[id])

    return (
        <div>
            <h1>Blog</h1>
        </div>
    );
};


export default Blog;
