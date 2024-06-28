import mongoose from "mongoose";

// Define the Question Schema
const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    points: { type: Number, required: true },
    questionType: { type: String, enum: ['multipleChoice', 'trueFalse', 'fillInBlanks'], required: true },
    questionText: { type: String, required: true },
    choices: [{ text: String, isCorrect: Boolean }], // For multipleChoice questions
    correctAnswers: [String], // For fillInBlanks questions
    correctAnswer: { type: Boolean } // For trueFalse questions
}, {
    collection: "questions"
});

// Define the Quiz Schema
const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    course: { type: String, required: true, ref: 'Course' },
    quizType: { type: String, enum: ['gradedQuiz', 'practiceQuiz', 'gradedSurvey', 'ungradedSurvey'], default: 'gradedQuiz' },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, enum: ['quizzes', 'exams', 'assignments', 'projects'], default: 'quizzes' },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attemptLimit: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, enum: ['never', 'immediately', 'afterLastAttempt'], default: 'never' },
    accessCode: { type: String, default: '' },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, required: false },
    availableDate: { type: Date, required: false },
    untilDate: { type: Date, required: false },
    published: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' }]
}, {
    collection: "quizzes"
});

// Define the Answer Schema
const answerSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attempt: { type: Number, required: true },
    answers: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel', required: true },
        answer: [String] // Array to handle multiple choice and fill in the blanks answers
    }],
    score: { type: Number, required: false },
    dateTaken: { type: Date, default: Date.now }
}, {
    collection: "answers"
});

export { quizSchema, questionSchema, answerSchema };
