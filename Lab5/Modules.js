const moduleData = {
    id: "mod123",
    name: "Introduction to Programming",
    description: "This module introduces basic programming concepts.",
    course: "Computer Science"
  };
  
export default function Modules(app) {
    // Route to get the entire module object
  app.get("/lab5/module", (req, res) => {
    res.json(moduleData);
  });
  
  // Route to get the module's name
  app.get("/lab5/module/name", (req, res) => {
    res.send(moduleData.name);
  });
  
  // Route to update the module's name
  app.post("/lab5/module/updateName", (req, res) => {
    const { newName } = req.body;
    moduleData.name = newName;
    res.send("Module name updated successfully.");
  });
  
  // Additional routes can be created following the same pattern for other properties like description, etc.
  
}