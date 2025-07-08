const express = require("express")
const User = require("../controllers/user")

const Routers = express.Router()

Routers.route("/getOneuser").get(User.getOneUser)

module.exports = Routers