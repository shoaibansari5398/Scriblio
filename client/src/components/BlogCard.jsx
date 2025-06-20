import { useNavigate } from "react-router-dom";



const BlogCard = ({blog}) => {


	const { title, image, description, category, _id } = blog

	const navigate = useNavigate();



	return (
		<div onClick={() => navigate(`/blog/${_id}`)} className="w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-primary/25 transition-all duration-300 cursor-pointer">
			<img src={image} alt="" className="aspect-video" />
			<span className="mt-4 ml-5 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">{category}</span>
			<div className="p-5">
				<h5 className="mb-2 font-medium text-gray-900">{title}</h5>
				<p className="text-gray-600 text-xs mb-3" dangerouslySetInnerHTML={{__html: description.slice(0, 100)}} />
			</div>
		</div>
	);
};

export default BlogCard;
