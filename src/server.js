const express = require("express");

const cors = require("cors");
const path = require("path");

const corsOptions = {
	origin: "http://localhost:3000",
};
const PORT = process.env.port;
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "..", "views")));

app.post("/", (req, res) => {
	const productInfo = req.body;
	let commission;
	let commissionValue;
	const { price, category } = productInfo;
	if (category === "mobile" && 500 <= price < 700) commission = 0.015;
	else if (category === "mobile" && 700 <= price < 900) commission = 0.02;
	else if (category === "mobile" && 900 <= price < 1000) commission = 0.025;
	else if (category === "mobile" && price > 1000) commission = 0.03;
	else if (category === "laptop" && 800 <= price < 900) commission = 0.0125;
	else if (category === "laptop" && 900 <= price < 1000) commission = 0.015;
	else if (category === "laptop" && 1000 <= price < 1200) commission = 0.017;
	else if (category === "laptop" && 1200 <= price < 1500) commission = 0.02;
	else if (category === "laptop" && 1500 <= price < 2000) commission = 0.025;
	else if (category === "laptop" && price >= 2000) commission = 0.03;

	commissionValue = price * commission;

	return res.status(200).json(`our service fees  are equal to ${commissionValue} dollars`);
});

app.get("/", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
app.listen(PORT || 5000, () => {
	console.log("Server working ");
});
