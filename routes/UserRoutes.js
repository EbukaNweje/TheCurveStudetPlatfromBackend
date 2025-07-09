const express = require("express")
const User = require("../controllers/user")

const Routers = express.Router()

Routers.route("/getOneuser/:studentId").get(User.getOneUser)
Routers.route("/getAlluser").get(User.getAllUser)

module.exports = Routers