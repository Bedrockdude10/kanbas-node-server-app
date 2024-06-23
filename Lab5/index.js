import PathParameters from './PathParameters.js';
import QueryParameters from './QueryParameters.js';
import WorkingWithObjects from './WorkingWithObjects.js';
import Modules from './Modules.js';
import WorkingWithArrays from './WorkingWithArrays.js';

export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
      res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    QueryParameters(app);
    WorkingWithObjects(app);
    Modules(app);
    WorkingWithArrays(app);
    // Add routes to update todo items
    app.post("/lab5/todos/:id/completed/:completed", (req, res) => {
        // Dummy logic to simulate database update
        // Here you would typically find the todo by id and update its completed status
        const { id, completed } = req.params;
        res.json({ message: `Todo with ID = ${id} marked as completed: ${completed}` });
    });

    app.post("/lab5/todos/:id/description/:description", (req, res) => {
        // Similarly, update the description of the todo
        const { id, description } = req.params;
        res.json({ message: `Description of Todo ID = ${id} updated to: ${description}` });
    });
  };
  