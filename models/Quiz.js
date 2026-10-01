const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    questions: [questionSchema],
    passingScore: { type: Number, default: 70 }, // النسبة المئوية للنجاح
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);