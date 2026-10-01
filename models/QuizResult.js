const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId },
        selectedOption: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizResult', quizResultSchema);