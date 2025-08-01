const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    studentId : {
        type: String,
        required: true  
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    stack: {
        type: String,
        required: true
    },

    assessment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment"
        }
    ]
})

module.exports = mongoose.model("User", UserSchema)