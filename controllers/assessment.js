const Assessment = require("../models/Assessment");
const User = require("../models/Users");

exports.createAssessment = async (req, res) => {
  try {
    const github = req.body.github?.trim();
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const stack = req.body.stack?.trim();
    const studentId = req.body.studentId?.trim();

    if (!github || !email || !name || !studentId) {
      return res.status(400).json({ message: "Name, email, studentId and GitHub link are required." });
    }

    const githubRepoRegex = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\.git)?(\/)?$/;
    if (!githubRepoRegex.test(github)) {
      return res.status(400).json({ message: "Invalid GitHub repository link" });
    }

    const existingAssessment = await Assessment.findOne({ github });
    if (existingAssessment) {
      return res.status(400).json({ message: "Assessment already exists for this GitHub link" });
    }

    // Create assessment
    const assessment = await Assessment.create({ github, name });

    // Find user or create new one
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        studentId,
        assessment: [assessment._id],
      });
    } else {
      user.assessment.push(assessment._id);
      await user.save();
    }

    // Re-fetch user with populated assessment data
    const populatedUser = await User.findById(user._id).populate("assessment");

    return res.status(201).json({
      message: "Assessment submitted successfully",
      assessment,
      user: populatedUser,
    });

  } catch (err) {
    console.error("Error creating assessment:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};



exports.getAssessment = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    return res.status(200).json(assessments);
  } catch (err) {
    console.error("Error fetching assessments:", err);
    return res.status(500).send({ message: "Server error", error: err });
  }
}



exports.approveAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    assessment.status = "approved";
    await assessment.save();
    return res.status(200).json({ message: "Assessment approved successfully" });
  } catch (err) {
    console.error("Error approving assessment:", err);
    return res.status(500).send({ message: "Server error", error: err });
  }
};
