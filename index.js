const express = require('express');
const cookkieParser = require("cookie-parser")
const cors = require("cors");
const app = express()
const AssessmentRoutes = require("./routes/AssessmentRoutes")

app.use(cors(origin="*"));
global.cronJobs = global.cronJobs || {};

app.use(cookkieParser())
app.use(express.json());

app.use("/api", AssessmentRoutes)





app.use("/", (req, res) => {
    res.status(200).send("hello world")
})

module.exports = app