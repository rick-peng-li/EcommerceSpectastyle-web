import Feedback from "../Models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, rating, feedback } = req.body;

    if (!name || !email || !rating || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, rating, feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Unable to submit feedback" });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve feedback" });
  }
};
