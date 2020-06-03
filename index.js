const app = require("express")();
const port = 3000;

app.get("/v1/seasonality-data", (req, res) =>
  res.json(require("./globalGrowingData.json"))
);

app.listen(port, () => {
  console.log("Listening on port", port);
});
