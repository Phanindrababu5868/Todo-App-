const express = require("express");
const TODO = require("../models/Todo");
const auth = require("../middleware/auth");

const router = express.Router();

//@description     Create new Task
//@route           POST /api/tasks
//@access          user (owner)
router.post("/", auth, async (req, res) => {
  const { content, backgroundColor } = req.body;

  try {
    const newTask = new TODO({
      userId: req.user.id,
      content,
      backgroundColor,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     fetch all tasks
//@route           GET /api/tasks
//@access          user (owner)
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await TODO.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     Archive Single note
//@route           GET /api/n/archive
//@access          user (owner)
router.get("/archive", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isArchived: true,
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     Trash Single note
//@route           GET /api/notes/trash
//@access          user (owner)
router.get("/trash", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isTrashed: true,
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     Search tasks
//@route           GET /api/tasks/search
//@access          user (owner)
router.get("/search", auth, async (req, res) => {
  const { query } = req.query;

  try {
    const tasks = await TODO.find({
      userId: req.user.id,
      $or: [{ content: { $regex: query, $options: "i" } }],
    }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     Update tasks
//@route           PUT /api/tasks/:id
//@access          user (owner)
router.put("/:id", auth, async (req, res) => {
  const { content, backgroundColor, status } = req.body;

  try {
    let task = await TODO.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    task = await TODO.findByIdAndUpdate(
      req.params.id,
      {
        content,
        backgroundColor,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@description     Delete task
//@route           DELETE /api/tasks/:id
//@access          user (owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await TODO.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    await TODO.findByIdAndDelete(req.params.id);

    res.json({ message: "task removed" });
  } catch (err) {
    console.error(
      `Error deleting task with id ${req.params.id}: ${err.message}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
