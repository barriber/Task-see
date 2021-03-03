const express = require("express");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require("multer");

const upload = multer({ dest: "upload/" });
const router = express.Router();
const type = upload.single("file");

let alertsTable = [];
let lastModified;

router.post("/", type, (req, res) => {
  const fileRows = [];
  csv
    .parseFile(req.file.path)
    .on("data", (data) => {
      fileRows.push(data); // push each row
    })
    .on("error", () => {
      res.status(500).json({
        message: "Failed to upload file",
      });
    })
    .on("end", function () {
      fileRows.shift(); // Assume csv is correct
      const now = new Date();
      console.log('fileRows', fileRows)
      fileRows.forEach(([city, condition]) => {
        const foundCityIndex = alertsTable.findIndex(
          (alert) => alert.city === city
        );
        const alertObj = { city, condition: condition.trim(), createdAt: now };
        if (foundCityIndex > -1) {
          alertsTable[foundCityIndex] = alertObj;
        } else {
          alertsTable.push(alertObj);
        }
      });
      lastModified = now;
      fs.unlinkSync(req.file.path);

      res.json({
        message: "Upload Completed!",
      });
    });

  router.get("/", (req, res) => {
    if (lastModified) {
      const filtered = alertsTable.filter(
        ({ createdAt }) => createdAt.getTime() === lastModified.getTime()
      );
      res.send(filtered);
    }
  });
});

module.exports = router;
