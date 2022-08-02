// Write your "projects" router here!
const router = require("express").Router();
const { validateProjectId, validateProjectBody } = require("./projects-middleware");
const db = require("./projects-model");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).send(projects);
  } catch {
    res.status(500).json({ message: "unable to get projects" });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  try {
    const project = await db.get(req.params.id);
    res.status(200).send(project);
  } catch {
    res.status(500).json({ message: "unable to get projects" });
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  try {
    const project = await db.getProjectActions(req.params.id);
    res.status(200).send(project);
  } catch {
    res.status(500).json({ message: "unable to get project actions" });
  }
});

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const newProject = await db.insert(req.body);
    res.status(201).send(newProject);
  } catch {
    res.status(500).json({ message: "Unable to add project" });
  }
});

router.put("/:id", [validateProjectBody, validateProjectId], async (req, res) => {
  try {
    const updatedProject = await db.update(req.params.id, req.body);
    res.status(201).send(updatedProject);
  } catch {
    res.status(500).json({ message: "Unable to update project" });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await db.remove(req.params.id);
    res.status(201).send();
  } catch {
    res.status(500).json({ message: "Unable to remove project" });
  }
});

module.exports = router;
