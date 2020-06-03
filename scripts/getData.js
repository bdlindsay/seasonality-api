const fs = require("fs");

const file = fs.readFileSync("./globalGrowingData.csv", "utf-8").toString();

const lines = file.split("\n");

const crop = 0;
const hub = 2;
const country = 3;
const site = 4;
const sapSiteId = 6;
const siteId = 7;
const jan = 8;
const feb = 9;
const mar = 10;
const apr = 11;
const may = 12;
const jun = 13;
const jul = 14;
const aug = 15;
const sep = 16;
const oct = 17;
const nov = 18;
const dec = 19;

const result = lines
  .map((line) => {
    const cells = line.split(",");
    const cropValue = cells[crop];
    if (cropValue === "") return null;

    const getValue = (v) => {
      switch (v) {
        case "":
          return "off-season";
        case "IS":
          return "in-season";
        case "P":
          return "planting";
        case "HV":
          return "harvest";
        default:
          console.warn("unknown season value", v);
          return null;
      }
    };
    const siteValue = cells[site].replace(/"/g, "").replace(":", ",");
    const sapSiteIdValue = cells[sapSiteId] === "" ? null : cells[sapSiteId];

    return {
      crop: cropValue,
      hub: cells[hub],
      country: cells[country],
      site: siteValue,
      sapSiteId: sapSiteIdValue,
      siteId: cells[siteId],
      jan: getValue(cells[jan]),
      feb: getValue(cells[feb]),
      mar: getValue(cells[mar]),
      apr: getValue(cells[apr]),
      may: getValue(cells[may]),
      jun: getValue(cells[jun]),
      jul: getValue(cells[jul]),
      aug: getValue(cells[aug]),
      sep: getValue(cells[sep]),
      oct: getValue(cells[oct]),
      nov: getValue(cells[nov]),
      dec: getValue(cells[dec]),
    };
  })
  .filter((o) => o !== null);

const droppedHeader = result.slice(1, result.length);

droppedHeader.forEach((object, index) => {
  for (const key in object) {
    if (object[key] === "") {
      console.log(index, key);
    }
  }
});

fs.writeFileSync(
  "./globalGrowingData.json",
  JSON.stringify(droppedHeader, null, 4)
);

console.log("Wrote", result.length, "objects");
