const express = require("express");

const cors = require("cors");
const path = require("path");

const corsOptions = {
	origin: "http://localhost:3000",
};
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "..", "views")));

app.post("/", (req, res) => {
	const productInfo = req.body;
	console.log(productInfo);
	let commission;
	let commissionValue;
	const { price, category } = productInfo;
	console.log(price);
	console.log(category);
	if (category === "mobile" && price < 700 && price >= 500) commission = 0.015;
	else if (category === "mobile" && price < 900 && price >= 700) commission = 0.02;
	else if (category === "mobile" && price < 1000 && price >= 900) commission = 0.025;
	else if (category === "mobile" && price >= 1000) commission = 0.03;
	else if (category === "laptop" && price < 900 && price >= 800) commission = 0.0125;
	else if (category === "laptop" && price < 1000 && price >= 900) commission = 0.015;
	else if (category === "laptop" && price < 1200 && price >= 1000) commission = 0.017;
	else if (category === "laptop" && price < 1500 && price >= 1200) commission = 0.02;
	else if (category === "laptop" && price < 2000 && price >= 1500) commission = 0.025;
	else if (category === "laptop" && price >= 2000) commission = 0.03;
	console.log(commission);

	commissionValue = price * commission;

	return res.status(200).json(`Our service fees  are equal to ${commissionValue} dollars`);
});

app.get("/", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
app.listen(PORT, () => {
	console.log("Server working ");
});
