import Faq from "../models/Faq.js";

function submitQuestion(req, res) {
  try {
    const { name, email, number, question, message } = req.body;

    const newQuestion = new Faq({
      name,
      email,
      phone: number,
      question,
      message,
    });

    newQuestion.save();

    res.status(201).json({ message: "Question submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export default {
  submitQuestion,
};
