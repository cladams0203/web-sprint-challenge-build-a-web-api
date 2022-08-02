// Write your "actions" router here!
const router = require("express").Router();
const db = require("./actions-model");
const { validateProjectId, validateActionBody } = require("./actions-middlware");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).send(actions);
  } catch (err) {
    res.status(500).json({ message: "Unable to get actions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actions = await db.get(req.params.id);
    if (actions) {
      res.status(200).send(actions);
    } else {
      res.status(404).json({ message: "No action found" });
    }
  } catch {
    res.status(500).json({ message: "Unable to get action" });
  }
});

router.post("/", [validateActionBody, validateProjectId], async (req, res) => {
  try {
    const newAction = await db.insert(req.body);
    res.status(201).send(newAction);
  } catch {
    res.status(500).json({ message: "Unable to add action" });
  }
});

router.put("/:id", [validateActionBody, validateProjectId], async (req, res) => {
  try {
    const updatedAction = await db.update(req.params.id, req.body);
    res.status(203).send(updatedAction);
  } catch {
    res.status(500).json({ message: "Unable to update action" });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await db.remove(req.params.id);
    res.status(201).send();
  } catch {
    res.status(500).json({ message: "Unable to update action" });
  }
});

module.exports = router;
