const express = require("express")
const Assessment = require("../controllers/assessment")

const Routers = express.Router()

Routers.route("/create-assessment").post(Assessment.createAssessment)

module.exports = Routers
