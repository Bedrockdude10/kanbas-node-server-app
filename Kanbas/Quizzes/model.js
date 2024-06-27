import mongoose from "mongoose";
import { quizSchema, questionSchema, answerSchema } from "./schema.js";

// Create models for quizzes, questions, and answers
const QuizModel = mongoose.model("QuizModel", quizSchema);
const QuestionModel = mongoose.model("QuestionModel", questionSchema);
const AnswerModel = mongoose.model("AnswerModel", answerSchema);

// Export the models
export { QuizModel, QuestionModel, AnswerModel };
