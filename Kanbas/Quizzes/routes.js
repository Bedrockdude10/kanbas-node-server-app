import * as dao from "./dao.js"; // Adjust path as needed

export default function QuizRoutes(app) {
    // Create a new quiz for a course
    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const newQuiz = {
            ...req.body,
            course: req.params.cid
        };
        const quiz = await dao.createQuiz(newQuiz);
        res.status(201).json(quiz);
    });

    // Get quizzes for a course
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const quizzes = await dao.findQuizzesByCourseId(req.params.cid);
        res.json(quizzes);
    });

    // Update a quiz
    app.put("/api/quizzes/:qid", async (req, res) => {
        const quizId = req.params.qid;
        console.log(`Received request to update quiz with ID: ${quizId}`);
        console.log('Request payload:', req.body);
        
        try {
            const updated = await dao.updateQuiz(quizId, req.body);
            console.log(`Result of database update operation:`, updated);
        
            if (updated.modifiedCount === 0) {
                console.log(`No quiz found with ID: ${quizId}`);
                return res.status(404).send("No quiz found with provided ID.");
            }
        
            console.log(`Quiz with ID: ${quizId} updated successfully.`);
            res.sendStatus(204);
        } catch (error) {
            console.error(`Error occurred while updating quiz with ID: ${quizId}`, error);
            res.status(500).json({ message: error.message });
        }
    });

    // Delete a quiz
    app.delete("/api/quizzes/:qid", async (req, res) => {
        const result = await dao.deleteQuiz(req.params.qid);
        if (result.deletedCount === 0) {
            res.status(404).send("No quiz found with provided ID.");
        } else {
            res.sendStatus(204);
        }
    });

    // Publish or unpublish a quiz
    app.post("/api/quizzes/:qid/publish", async (req, res) => {
        try {
            const result = await dao.publishQuiz(req.params.qid, req.body.published);
            if (!result) {
                res.status(404).send("No quiz found with provided ID.");
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(`Error occurred while publishing quiz with ID: ${req.params.qid}`, error);
            res.status(500).json({ message: error.message });
        }
    });

    // Add a question to a quiz
    app.post("/api/quizzes/:qid/questions", async (req, res) => {
        const newQuestion = req.body;
        try {
            const question = await dao.addQuestionToQuiz(req.params.qid, newQuestion);
            res.status(201).json(question);
        } catch (error) {
            console.error(`Error occurred while adding question to quiz with ID: ${req.params.qid}`, error);
            res.status(500).json({ message: error.message });
        }
    });

    // Get questions for a quiz
    app.get("/api/quizzes/:qid/questions", async (req, res) => {
        try {
            const questions = await dao.findQuestionsByQuizId(req.params.qid);
            res.json(questions);
        } catch (error) {
            console.error(`Error occurred while fetching questions for quiz with ID: ${req.params.qid}`, error);
            res.status(500).json({ message: error.message });
        }
    });

    // Delete a question from a quiz
    app.delete("/api/questions/:qid", async (req, res) => {
        const result = await dao.deleteQuestion(req.params.qid);
        if (result.deletedCount === 0) {
            res.status(404).send("No question found with provided ID.");
        } else {
            res.sendStatus(204);
        }
    });

    // Handle quiz attempts for students
    app.post("/api/quizzes/:qid/attempts", async (req, res) => {
        const attemptData = {
            ...req.body,
            quiz: req.params.qid,
            user: req.user.id // Assuming req.user is populated with the authenticated user
        };
        try {
            const attempt = await dao.createQuizAttempt(attemptData);
            res.status(201).json(attempt);
        } catch (error) {
            console.error(`Error occurred while creating quiz attempt for quiz with ID: ${req.params.qid}`, error);
            res.status(500).json({ message: error.message });
        }
    });

    // Get quiz attempts for a user
    app.get("/api/quizzes/:qid/attempts", async (req, res) => {
        try {
            const attempts = await dao.findQuizAttempts(req.params.qid, req.user.id); // Assuming req.user is populated with the authenticated user
            res.json(attempts);
        } catch (error) {
            console.error(`Error occurred while fetching quiz attempts for quiz with ID: ${req.params.qid}`, error);
            res.status(500).json({ message: error.message });
        }
    });
}
