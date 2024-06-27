import { QuizModel, QuestionModel, AnswerModel } from "./model.js"; // Adjust the path based on your project structure

// Create a new quiz
export const createQuiz = async (quizData) => {
  const newQuiz = new QuizModel(quizData);
  return await newQuiz.save();
};

// Find all quizzes
export const findAllQuizzes = async () => {
  return await QuizModel.find();
};

// Find a quiz by ID
export const findQuizById = async (quizId) => {
  return await QuizModel.findById(quizId).populate('questions');
};

// Find quizzes by course ID
export const findQuizzesByCourseId = async (courseId) => {
  return await QuizModel.find({ course: courseId }).populate('questions');
};

// Update a quiz
export const updateQuiz = async (quizId, quizData) => {
  return await QuizModel.updateOne({ _id: quizId }, { $set: quizData });
};

// Delete a quiz
export const deleteQuiz = async (quizId) => {
  return await QuizModel.deleteOne({ _id: quizId });
};

// Publish or unpublish a quiz
export const publishQuiz = async (quizId, published) => {
  return await QuizModel.updateOne({ _id: quizId }, { $set: { published } });
};

// Add a question to a quiz
export const addQuestionToQuiz = async (quizId, questionData) => {
  const newQuestion = new QuestionModel(questionData);
  const savedQuestion = await newQuestion.save();
  await QuizModel.updateOne({ _id: quizId }, { $push: { questions: savedQuestion._id } });
  return savedQuestion;
};

// Find questions by quiz ID
export const findQuestionsByQuizId = async (quizId) => {
  const quiz = await QuizModel.findById(quizId).populate('questions');
  return quiz ? quiz.questions : [];
};

// Delete a question
export const deleteQuestion = async (questionId) => {
  const result = await QuestionModel.deleteOne({ _id: questionId });
  if (result.deletedCount > 0) {
    await QuizModel.updateMany({}, { $pull: { questions: questionId } });
  }
  return result;
};

// Create a quiz attempt
export const createQuizAttempt = async (attemptData) => {
  const newAttempt = new AnswerModel(attemptData);
  return await newAttempt.save();
};

// Find quiz attempts by quiz ID and user ID
export const findQuizAttempts = async (quizId, userId) => {
  return await AnswerModel.find({ quiz: quizId, user: userId });
};
