import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};


export default auth;
