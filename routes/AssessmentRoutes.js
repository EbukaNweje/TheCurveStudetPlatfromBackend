const express = require("express")
const Assessment = require("../controllers/assessment")

const Routers = express.Router()

Routers.route("/create-assessment").post(Assessment.createAssessment)
Routers.route("/get-assessment").get(Assessment.getAssessment)
Routers.route("/approve-assessment/:assessmentId").get(Assessment.approveAssessment)

module.exports = Routers
