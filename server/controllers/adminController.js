import jwt from "jsonwebtoken";

const adminLogin = (req, res) => {
	try {
		const { email, password } = req.body;
		if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ message: "Admin logged in successfully", token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export default adminLogin;
