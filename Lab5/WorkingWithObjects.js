const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };

  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.post("/lab5/assignment/updateScore", (req, res) => {
        const { newScore } = req.body;
        assignment.score = newScore;
        res.json({ message: "Score updated successfully", assignment });
    });

    app.post("/lab5/assignment/updateCompleted", (req, res) => {
        const { newCompleted } = req.body;
        assignment.completed = newCompleted;
        res.json({ message: "Completion status updated successfully", assignment });
    });

    app.post("/lab5/module/updateDescription", (req, res) => {
        const { newDescription } = req.body;
        module.description = newDescription;
        res.json({ message: "Module description updated successfully", module });
    });
  };
  