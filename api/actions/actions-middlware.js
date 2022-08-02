// add middlewares here related to actions
const projectDb = require("../projects/projects-model");

async function validateProjectId(req, res, next) {
  const foundProject = await projectDb.get(req.body.project_id);
  foundProject ? next() : res.status(404).json({ message: "Invalid Project Id" });
}

function validateActionBody(req, res, next) {
  const { description, notes, project_id } = req.body;
  if (!description || !notes || !project_id) {
    res.status(400).json({ message: "invalid action" });
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateActionBody,
};
