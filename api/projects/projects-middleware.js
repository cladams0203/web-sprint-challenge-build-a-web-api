// add middlewares here related to projects

const projectDb = require("./projects-model");

async function validateProjectId(req, res, next) {
  const foundProject = await projectDb.get(req.params.id);
  foundProject ? next() : res.status(404).json({ message: "Invalid Project Id" });
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!description || !name || !("completed" in req.body)) {
    res.status(400).json({ message: "invalid project" });
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectBody,
};
