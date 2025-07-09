const User = require("../models/Users");

exports.getOneUser = async (req, res) => {
    try {
        const { email } = req.query; 

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email }).populate("assessment");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).send({ message: "Server error", error: err.message });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().populate("assessment");
        return res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).send({ message: "Server error", error: err.message });
    }
};
