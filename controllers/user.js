const User = require("../models/Users");

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email}).populate("assessment");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).send({ message: "Server error", error: err });
    }
};