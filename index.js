const app = require("express")();
const cors = require("cors");
const compression = require("compression");
const port = 3000;

app.use(compression());
app.use(cors());

app.get("/v1/seasonality-data", (req, res) => {
  res.status(200).json(require("./globalGrowingData.json"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
