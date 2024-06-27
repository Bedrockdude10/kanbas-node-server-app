import * as dao from "./dao.js"; // Adjust path as needed

export default function CourseRoutes(app) {
    app.post("/api/courses", async (req, res) => {
        const newCourse = await dao.createCourse(req.body);
        res.status(201).json(newCourse);
    });

    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    });

    app.get("/api/courses/:id", async (req, res) => {
        const course = await dao.findCourseById(req.params.id);
        if (!course) {
            res.status(404).send("Course not found.");
        } else {
            res.json(course);
        }
    });

    app.put("/api/courses/:id", async (req, res) => {
        const updated = await dao.updateCourse(req.params.id, req.body);
        if (updated.modifiedCount === 0) {
            res.status(404).send("No course found with provided ID.");
        } else {
            res.sendStatus(204);
        }
    });

    app.delete("/api/courses/:id", async (req, res) => {
        const result = await dao.deleteCourse(req.params.id);
        if (result.deletedCount === 0) {
            res.status(404).send("No course found with provided ID.");
        } else {
            res.sendStatus(204);
        }
    });
}
