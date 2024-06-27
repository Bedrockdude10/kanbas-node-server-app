import * as dao from "./dao.js"; // Adjust path as needed

export default function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const newModule = {
            ...req.body,
            course: req.params.cid
        };
        const module = await dao.createModule(newModule);
        res.status(201).json(module);
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const modules = await dao.findModulesByCourseId(req.params.cid);
        res.json(modules);
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const moduleId = req.params.mid;
        console.log(`Received request to update module with ID: ${moduleId}`);
        console.log('Request payload:', req.body);
        
        try {
          const updated = await dao.updateModule(moduleId, req.body);
          console.log(`Result of database update operation:`, updated);
      
          if (updated.modifiedCount === 0) {
            console.log(`No module found with ID: ${moduleId}`);
            return res.status(404).send("No module found with provided ID.");
          }
      
          console.log(`Module with ID: ${moduleId} updated successfully.`);
          res.sendStatus(204);
        } catch (error) {
          console.error(`Error occurred while updating module with ID: ${moduleId}`, error);
          res.status(500).json({ message: error.message });
        }
      });
      

    app.delete("/api/modules/:mid", async (req, res) => {
        const result = await dao.deleteModule(req.params.mid);
        if (result.deletedCount === 0) {
            res.status(404).send("No module found with provided ID.");
        } else {
            res.sendStatus(204);
        }
    });
}
