

const Newsletter = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
			<h1 className="text-2xl md:text-4xl font-semibold">Never miss a blog</h1>
			<p className="md:text-lg text-gray-500/70 pb-8">Subscribe to our newsletter to get the latest blogs delivered to your inbox.</p>
			<form action="" className="flex items-center justify-center max-w-xl w-full md:h-13 h-12">
				<input className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500" type="text" placeholder="Enter your email" required />
				<button type="submit" className="md:px-12 px-8 h-full rounded hover:scale-105 transition-all cursor-pointer bg-primary/80 hover:bg-primary text-white rounded-md rounded-l-none">Subscribe</button>
			</form>
		</div>
	);
};

export default Newsletter;
