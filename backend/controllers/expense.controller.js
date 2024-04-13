
const db = require("../utils/db");

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.addExpense = (req, res) => {
	const userId = req.user.id;
	const currentDate = new Date().toISOString().slice(0, 10);


	const q = "INSERT INTO expens (`category`,`description`,`expense`,`eid`,`date`) VALUES(?,?,?,?,?)";
	const values = [
		req.body.category,
		req.body.description,
		req.body.expense,
		userId,
		currentDate
	]
	console.log(currentDate)
	db.query(q, values, (err, data) => {
		if (err) return res.status(403).json("error in addexpense execution in controller: ", err);
		console.log("expense is added");
		res.status(200).json("expense is added successfully");
	})
}

exports.getExpense = (req, res) => {

	try {


		const q = "SELECT * FROM expens WHERE eid= ?";
		db.query(q, [req.user.id], (err, data) => {
			if (err) return res.json("error in getexpense");

			console.log(data);

			const pageSize = parseInt(req.query.pageSize);
			const currentPage = parseInt(req.query.page);
			const startIndex = (currentPage - 1) * pageSize;
			const lastIndex = currentPage * pageSize;
			const paginatedData = data.slice(startIndex, lastIndex);
			const totalPages = data.length / pageSize;
			//res.status(200).json({message:paginatedData ,totalPages});
			res.json(paginatedData);
		})
	}
	catch (err) {
		console.log(err);
		res.json({ message: err.message });
	}
}


const expenses = (userId) => {
	const q = "SELECT * FROM expens WHERE eid = ?";
	return new Promise((resolve, reject) => {
		db.query(q, userId, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};




exports.downloadExpense = async (req, res) => {

	const data = await expenses(req.user.id);
	try {

		console.log(process.env.AWS_KEYID);
		console.log(process.env.SECRET_ACCESSKEY)
		const s3Client = new S3Client({
			region: "ap-south-1",
			credentials: {
				accessKeyId: process.env.AWS_KEYID,
				secretAccessKey: process.env.SECRET_ACCESSKEY
			}

		})
		const stringidata = JSON.stringify(data)
		const filename = `expense_${Date.now()}.txt`
		const command = new PutObjectCommand({
			Bucket: "expenseapp-subhadip",
			Key: filename,
			Body: stringidata,
		})
		await s3Client.send(command);
		const command2 = new GetObjectCommand({
			Bucket: "expenseapp-subhadip",
			Key: filename
		})

		 s3Client.send(command2);

		const url = await getSignedUrl(s3Client, command2);

		console.log(url)

		res.status(200).json(url);
	}
	catch (err) {
		console.log(err);
		res.status(404).json({ message: err.message })
	}
}




exports.deleteExpense = (req, res) => {

	const q = "DELETE FROM expens WHERE eid= ? AND id= ?";

	const values = [req.user.id, req.params.id];

	db.query(q, values, (err, data) => {

		if (err) return res.status(404).json("error in delete user :", err);

		res.status(200).json("successfully deleted");
	})

}

exports.updateExpense = (req, res) => {
	const expenseId = req.params.id;
	const q = "UPDATE expens SET `category`=?,`description`=?,`expense`=? WHERE id=? AND eid=?";
	const values = [
		req.body.category,
		req.body.description,
		req.body.expense,
		expenseId,
		req.user.id
	]
	db.query(q, values, (err, data) => {
		if (err) return res.status(401).json("error in update expense controller");

		res.json("successfully updated");
	})


}
