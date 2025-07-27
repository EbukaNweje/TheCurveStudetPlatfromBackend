const Assessment = require("../models/Assessment");
const User = require("../models/Users");

exports.createAssessment = async (req, res) => {
  try {
    const submissionLink = req.body.submissionLink?.trim(); // or req.body.submissionLink if you rename it in frontend
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const stack = req.body.stack?.trim();
    const studentId = req.body.studentId?.trim();

   if (!name) {
  return res.status(400).json({ message: "Name is required." });
}

if (!email) {
  return res.status(400).json({ message: "Email is required." });
}

if (!stack) {
  return res.status(400).json({ message: "Stack is required." });
}

if (!studentId) {
  return res.status(400).json({ message: "Student ID is required." });
}

if (!submissionLink) {
  return res.status(400).json({ message: "Submission link is required." });
}


    // Optional: Validate it's a general URL
    const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(submissionLink)) {
      return res.status(400).json({ message: "Invalid link format" });
    }

    const existingAssessment = await Assessment.findOne({ submissionLink: submissionLink });
    if (existingAssessment) {
      return res.status(400).json({ message: "Assessment already exists for this link" });
    }

    // Create assessment with general link
    const assessment = await Assessment.create({ submissionLink: submissionLink, name });

    // Find user or create new one
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        studentId,
        stack,
        assessment: [assessment._id],
      });
    } else {
      user.assessment.push(assessment._id);
      await user.save();
    }

    // Re-fetch user with populated assessments
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
    assessment.status = "Approved";
    await assessment.save();
    return res.status(200).json({ message: "Assessment approved successfully" });
  } catch (err) {
    console.error("Error approving assessment:", err);
    return res.status(500).send({ message: "Server error", error: err });
  }
};
