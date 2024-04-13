const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/sendMail")



exports.forgetPassword = (req, res) => {
	try {
		const { email } = req.body;
		const id = uuidv4();
		console.log(id);


		const userQuery = "SELECT * FROM user WHERE email = ?";
		db.query(userQuery, [email], (err, userData) => {
			if (err) {
				return res.status(500).json({ message: err.message });
			}

			const q = "INSERT INTO passwords (uuid,pid) VALUES (?,?)";

			db.query(q, [id, userData[0].id], (err, data) => {
				if (err) return res.status(500).json({ message: err.message });

				sendMail(id, email);
				res.status(200).json({ message: `Token has been sent to ${id}` });
			});

		})
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}

}


exports.authpassword = (req, res) => {
	try {
		const id = req.params.id;
		const q = "SELECT * FROM passwords WHERE uuid=?";
		db.query(q, id, (err, data) => {
			if (err) return res.status(500).json(err);

			if (data.length == 0) return res.status(200).json("token is not valid")

			res.status(202).json("user valid");
		})
	}
	catch (err) {
		res.status(404).json(err);

	}

}


exports.resetPassword = async (req, res) => {
	try {
		const { id } = req.params;
		const { password } = req.body;
		console.log(id);

		const salt = bcrypt.genSaltSync(5);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const q = "UPDATE  user SET password=? WHERE id=(SELECT pid FROM passwords WHERE uuid=?)"

		const values = [
			hashedPassword,
			id

		]
		db.query(q, values, (err, data) => {
			if (err) return res.status(404).json({
				success: false,
				message: err.message
			})
			console.log(data);

			res.status(201).json( "password is updated successfully" );

	})
}
	catch (err) {
		res.status(406).json({
			success: false,
			message: err.message
		});
	}

}