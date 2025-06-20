import { useNavigate } from "react-router-dom";

const Navbar = () => {

	const navigate = useNavigate();
	return (
		<div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:ms-32 cursor-pointer">
			<h3
				onClick={() => navigate("/")}
				className="text-primary font-semibold text-2xl"
			>
				Scriblio
			</h3>
			<button
				onClick={() => navigate("/admin")}
				className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
			>
				Login
			</button>
		</div>
	);
};


export default Navbar;
