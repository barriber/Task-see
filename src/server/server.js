const express = require('express');
const bodyParser = require('body-parser')
const alerts = require("./routes/alerts");

const app = express();
app.use( bodyParser.json() );
app.use("/api/alerts", alerts);

app.listen(process.env.PORT || 8080);
