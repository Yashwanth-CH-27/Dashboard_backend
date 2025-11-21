const express = require("express");
const Task = require("../models/task");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

// CREATE Task
router.post("/task/create", userAuth, async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      userId: req.user._id,   
      title,
      description,
      status,
      priority,
    });

    return res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// READ ALL Tasks
router.get("/task/readall", userAuth, async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = { userId: req.user._id }; 

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    return res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// READ single Task
router.get("/task/read/:id", userAuth, async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      userId: req.user._id,    
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// UPDATE Task
router.put("/task/update/:id", userAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, priority } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id }, 
      { title, description, status, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE Task
router.delete("/task/delete/:id", userAuth, async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user._id,  
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
