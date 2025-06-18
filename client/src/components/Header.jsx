import {assets} from "../assets/assets";

const Header = () => {
	return (
		<div className="mx-8 sm:mx-16 xl:ms-24 relative">
			<div className="text-center mb-8 mt-20">
				<div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-40 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
					<p>New: AI Feature Integrated</p>
					<img src={assets.star_icon} alt="" />
				</div>
				<h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">Your own <span className="text-primary">blogging</span><br /> platform</h1>

				<p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word pr thousand, you story starts right here.</p>
				<form action="" className="flex justify-between max-w-lg msx-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
					<input type="text" placeholder="Search for blogs" className="w-full pl-4 outline-none" />
					<button className="px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer bg-primary text-white">Search</button>
				</form>
			</div>
			<img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50" />
		</div>
	);
};

export default Header;
