const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const year = now.getFullYear();
      return `${month}/${day}/${year}`; 
    },
  },
  time: {
    type: String,
    required: true,
    default: () => {
      const now = new Date();
      return now.toTimeString().split(" ")[0]; 
    },
  },
  submissionLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
